import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
                    const response = await fetch(`${process.env.API_URL}/auth/signin`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                    });
                    const data = await response.json();
                    if (data.success) {
                        return data;
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
            console.log(url, baseUrl);
            return url.startsWith(baseUrl) ? url : baseUrl;
        }
    }
});

export { handler as GET, handler as POST };
