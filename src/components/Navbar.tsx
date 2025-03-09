"use client";

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


const Navbar = () => {
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

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