import NextAuth, { Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            email?: string;
            name?: string;
            token?: string;
        };
    }
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                try {
                    const response = await fetch(`${apiUrl}/auth/signin`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                    });
                    const data = await response.json();
                    if (data.success) {
                        const token_decoded = jwt.decode(data.data.access_token);
                        const decodedToken = token_decoded as jwt.JwtPayload;
                        const user = { id: decodedToken?.id || "", email: decodedToken?.email, name: decodedToken?.name, token: data.data.access_token };
                        return user;
                    } else {
                        throw new Error("Invalid credentials");
                    }
                } catch (error) {
                    console.error('An unexpected error happened:', error);
                    throw new Error("Invalid credentials");
                }
            },
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            }
        })
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
        async session({ session, token }) {
            if (token) {
                if (session.user) {
                    session.user.token = token.accessToken as string;
                }
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = (user as any).token;
            }
            return token;
        }
    }
});

export { handler as GET, handler as POST };
