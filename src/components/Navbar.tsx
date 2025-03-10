"use client";

import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';


const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const defaultPassword = process.env.NEXT_PUBLIC_DEFAULT_PASSWORD;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const registerUser = async () => {
      if (status === 'authenticated' && session?.user && session.user.image) {
      try {
        const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email, username: session.user.name, password: defaultPassword }),
        });
        const data = await response.json();
        if (!data.success) {
        if (data.message === 'Email already exists' || data.message === 'Username already exists') {
          const result1 = await signIn("credentials", { redirect: false, email: session.user.email, password: defaultPassword, mode: 'silent' });
          console.log('line 49', result1);
          if (result1?.error === "Invalid credentials") {
          toast.error("Oops! It looks like you're already registered with a password. Please log in with your email and password before using Google or GitHub OAuth.", {
            autoClose: 10000,
            onClose: () => signOut(),
          });
          }
        }
        } else {
        const result2 = await signIn("credentials", { redirect: false, email: session.user.email, password: defaultPassword, mode: 'silent' });
        console.log('line 59', result2);
        console.log('User registered:', data);
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
      }
    };

    registerUser();
  }, [session, status]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0b1736', transition: 'background-color 0.3s' }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">
            <img src="/Bit.ly_Logo.svg.png" alt="My App Logo" style={{ height: '40px', marginRight: '10px' }} />
          </Link>
        </Typography>
        {status === 'authenticated' && (
          <div>
            <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit" >
              <AccountCircle />
              <Typography sx={{ marginLeft: '10px' }}> {session?.user?.name} </Typography>
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorEl)} onClose={handleClose} >
              <MenuItem onClick={() => { handleClose(); signOut(); }}>Logout</MenuItem>
              <MenuItem component={Link} href="/dashboard">Dashboard</MenuItem>
            </Menu>
          </div>


        )}
        {status === 'unauthenticated' && (
          <Box>
            <Button color="inherit" sx={{ marginRight: '20px' }} href="/dashboard/login">
              Login
            </Button>
            <Button color="inherit" sx={{ marginRight: '20px' }} href="/dashboard/register">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;