"use client";
import * as React from 'react';
import { useLayoutEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import useSWR from 'swr';
import Snackbar from '@mui/material/Snackbar';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const accessToken = session?.user?.token;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

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

  const { data: urls, error } = useSWR(accessToken ? `${apiUrl}/urls` : null, fetcher);

  if (status === "loading" || !urls) {
    return <p>Loading...</p>;
  }

  if (!session || error) {
    return null;
  }

  if (!urls.success || urls.data.length === 0) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Shorten links</h1>
          <Box>
            <Button href="/" fullWidth variant="contained" sx={{ marginTop: '20px', display: 'flex', cursor: 'pointer', borderRadius: '10px', backgroundColor: "#0058dd", fontWeight: 300, ':hover': { bgcolor: '#0b1736', color: '#fff' } }}>Shorten URL</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
          <SearchOffIcon sx={{ fontSize: 40, color: 'gray' }} />
          <Typography variant="h6" color="textSecondary">
            No shorten link found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Shorten links</h1>
        <Box>
          <Button href="/" fullWidth variant="contained" sx={{ marginTop: '20px', display: 'flex', cursor: 'pointer', borderRadius: '10px', backgroundColor: "#0058dd", fontWeight: 300, ':hover': { bgcolor: '#0b1736', color: '#fff' } }}>Shorten URL</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {urls.data.map((url: any, index: number) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem key={url.id} secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={() => {
                  navigator.clipboard.writeText(`${apiUrl}/${url.short_code}?utm_source=true`);
                  setOpen(true);
                }}>
                  <ContentCopyIcon />
                </IconButton>
              } disablePadding>
                <ListItemButton role={undefined} dense component="a" href={`dashboard/${url.short_code}`}>
                  <ListItemText id={labelId} primary={`${frontendUrl}/${url.short_code}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message="Link copied to clipboard"
      />
      </Box>
    </Container>
  );
}
