"use client";
import React, { useState } from 'react'
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import Link from 'next/link';

function Register() {
  const [err, setErr] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;
    const re_password = form.elements.namedItem('re_password') as HTMLInputElement;
    console.log(name.value, email.value, password.value, re_password.value);
    try {
      const response = await fetch('http://localhost:3010/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.value, email: email.value, password: password.value }),
      });
      if (response.ok) {
        setErr(false);
        console.log('User created');
        return;
      }
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
          Sign Out
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
          {err && <Typography variant="body2" color="error">An unexpected error happened</Typography>}
          <Link href="/dashboard/login" passHref> Login with an existing account</Link>

        </Box>

      </Box>
    </Container>
  )
}

export default Register