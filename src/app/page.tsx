import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react';

const Home = () => {
  return (
    <Container>
      <Box sx={{ padding: '50px 0', textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }} >
          Build stronger digital connections
        </Typography>

        <Typography variant="h5" component="p" gutterBottom sx={{ marginTop: '40px', marginBottom: '40px' }}>
          Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the Bitly Connections Platform.
        </Typography>
        <Box sx={{ marginTop: '20px' }}>
          <Button variant="outlined" color="error" size='large' sx={{ marginRight: '20px', ':focus': { bgcolor: '#e65100', color: '#fff' } }}>
            Short Link
          </Button>
          <Button variant="outlined" color="primary" size='large' sx={{ marginRight: '20px', ':focus': { bgcolor: '#01579b', color: '#fff' } }}>
            QR Code
          </Button>
        </Box>

        <Box sx={{ marginTop: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
              Shorten a long link
            </Typography> 
            <Typography variant="body1" component="p">
              No credit card required.
            </Typography>
            </Box>
          <Box sx={{ marginTop: '60px', display: 'flex' }}>
            <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>
              Enter a long URL to make it short
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            placeholder="Enter your long URL"
            fullWidth
            sx={{ marginTop: '20px' }}
          />
          <Button variant='contained' size='large' color='primary' sx={{ marginTop: '20px',display:'flex', ':hover': { bgcolor: '#01579b', color: '#fff' } }}>
            Get your link for free
          </Button>
        </Box>
      </Box>
    </Container >
  );
};

export default Home;