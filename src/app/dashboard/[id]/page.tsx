import { Container, Typography } from '@mui/material';
import React from 'react';
// import { useParams } from 'next/navigation';

function LinkPage() {
    // const params = useParams();
    // const id = params.id;
  
    return (
    <Container sx={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Link:
      </Typography>
      <Typography variant="h4" gutterBottom>
        Number of clicks
      </Typography>
      <Typography variant="h1" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
        20
      </Typography>
    </Container>
    );
  }
  
  export default LinkPage;