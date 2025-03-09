"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Link from 'next/link';
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const session = useSession();
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#0b1736', transition: 'background-color 0.3s' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <img src="/Bit.ly_Logo.svg.png" alt="My App Logo" style={{ height: '40px', marginRight: '10px' }} />
          </Link>
        </Box>
        <Box>
          <Button color="inherit" sx={{ marginRight: '20px' }} href="/dashboard/login">
            Login
          </Button>
          <Button color="inherit" sx={{ marginRight: '20px' }} href="/dashboard/register">
            Register
          </Button>
          <Button color="inherit" sx={{ marginRight: '20px' }} href="/dashboard">
            Dashboard
          </Button>
          {session.status === 'authenticated' && (
            <Button color="inherit" sx={{ marginRight: '20px' }} onClick={() => signOut()}>
              <LogoutIcon />
            </Button>
          )}

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;