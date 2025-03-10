"use client";
import React, { useState } from 'react'
import { Button, TextField, Container, Typography, Box, FormHelperText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerSchema } from '@/libs/registerValidation';

function Register() {
  const [err, setErr] = useState(false);
  const [formError, setFormError] = useState('');
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const re_password = form.elements.namedItem('re_password') as HTMLInputElement;

    const { error } = registerSchema.validate({ username: name.value, email: email.value, password: password.value, confirmPassword: re_password.value });
    if (error) {
      setErr(true);
      setFormError(error.message);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: name.value, email: email.value, password: password.value }),
      });
      const data = await response.json();
      if (data.success) {
        setErr(false);
        router.push('/dashboard/login');
        return;
      }
      setFormError(data.message);
      setErr(true);
    } catch (error) {
      console.error('An unexpected error happened:', error);
      setErr(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      >
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="UserName"
            name="name"
            autoComplete="name"
            autoFocus
          />
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="re_password"
            label="Confirm Password"
            type="password"
            id="re_password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Sign-Out </Button>
          {err && <FormHelperText error>{formError}</FormHelperText>}
          <Link href="/dashboard/login" passHref> Login with an existing account</Link>

        </Box>

      </Box>
    </Container>
  )
}

export default Register