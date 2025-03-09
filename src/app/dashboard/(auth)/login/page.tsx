"use client";
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, FormHelperText } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    router.push("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;

    if (!email.value || !password.value) {
      if (!email.value) setHelperText("Please fill in the email field");
      if (!password.value) setHelperText("Please fill in the password field");
      setError(true);
      return;
    }

    if (!emailRegex.test(email.value)) {
      setHelperText("Please enter a valid email address");
      setError(true);
      return;
    }

    if (password.value.length < passwordMinLength) {
      setHelperText(`Password must be at least ${passwordMinLength} characters long`);
      setError(true);
      return;
    }

    signIn("credentials", { email: email.value, password: password.value });

  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && <FormHelperText error>{helperText}</FormHelperText>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign-In </Button>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ mt: 1, mb: 1 }} onClick={() => signIn("google")}>  Sign in with Google </Button>
          <Button fullWidth variant="outlined" startIcon={<GitHubIcon />} sx={{ mt: 1, mb: 1 }} onClick={() => signIn("github")}>  Sign in with GitHub </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
