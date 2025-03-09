import { Container, Typography } from '@mui/material';
import { notFound } from 'next/navigation';
import React from 'react';

// export const metadata = {
//   title: "QT-Challenge - Link page",
//   description: "Link page",
// };

export async function generateMeta({ params }: { params: { id: string } }) {
  const data = await readUrl(params.id);
  return {
    title: `QT-Challenge - Link ${data.short_code}`,
    description: `Link ${data.long_url}`,
  };
}

async function readUrl(id: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`); 
  if (!response.ok) {
    return notFound();
  }
  return response.json();
}

async function LinkPage({ params }: { params: { id: string } }) {
  const data = await readUrl(params.id);
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