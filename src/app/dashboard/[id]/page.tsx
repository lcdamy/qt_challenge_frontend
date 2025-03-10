"use client";
import { Button, Container, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLayoutEffect } from 'react';
import useSWR from 'swr';


export default function LinkPage({ params }: any) {

  const { data: session, status } = useSession();
  const router = useRouter();
  const accessToken = session?.user?.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useLayoutEffect(() => {
    if (status === "unauthenticated") {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  const fetcher = (url: string) => fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  }).then((res) => res.json());

  const { data: link, error } = useSWR(accessToken ? `${apiUrl}/analytics/${params.id}` : null, fetcher);

  return (
    <Container sx={{ marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Number of clicks
      </Typography>
      <Typography variant="h1" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
      {error && <Typography variant="h6" color="error">Failed to load data</Typography>}
      {!link && !error && <Typography variant="h6">Loading...</Typography>}
      {link?.data?.clicks}
      </Typography>
      <Button variant="contained" color="primary" onClick={() => window.history.back()} sx={{ marginTop: '20px', display: 'flex', cursor: 'pointer', borderRadius: '10px', backgroundColor: "#0058dd", fontWeight: 300, ':hover': { bgcolor: '#0b1736', color: '#fff' } }}>
        Go Back
      </Button>
    </Container>
  );
}