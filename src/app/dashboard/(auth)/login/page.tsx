"use client";
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, FormHelperText, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/libs/loginValidation';


function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (status === "loading") {
    return (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'inline-block', width: 80, height: 80, border: '3px solid #0058dd', borderRadius: '50%', borderTop: '3px solid transparent', animation: 'spin 1s linear infinite' }} />
        <Typography variant="h6" color="textSecondary" sx={{ marginTop: '20px' }}>
          Loading...
        </Typography>
      </Box>
      <style jsx global>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
    </Box>);
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
    const { error } = loginSchema.validate({ email: email.value, password: password.value });
    if (error) {
      setError(true);
      setHelperText(error.message);
      return;
    }

    const result = await signIn("credentials", { redirect: false, email: email.value, password: password.value, mode: 'login' });

    if (result?.error) {
      setError(true);
      setHelperText(result.error);
    } else {
      setError(false);
      setHelperText('');
    }
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
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}

          />
          {error && <FormHelperText error>{helperText}</FormHelperText>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Login </Button>
          <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} sx={{ mt: 1, mb: 1 }} onClick={() => signIn("google")}>  Sign in with Google </Button>
          <Button fullWidth variant="outlined" startIcon={<GitHubIcon />} sx={{ mt: 1, mb: 1 }} onClick={() => signIn("github")}>  Sign in with GitHub </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
