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
import DashboardMenu from '@/components/DashboardMenu';

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

  const [page, setPage] = React.useState(1);
  const pageSize = 20;

  const fetcher = (url: string) => fetch(url, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  }).then((res) => res.json());

  const { data: urls, error } = useSWR(
    accessToken ? `${apiUrl}/urls?page=${page}&limit=${pageSize}` : null,
    fetcher
  );



  if (status === "loading" || !urls) {
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

  if (!session || error) {
    return null;
  }

  if (!urls.success || urls.data.urls.length === 0) {
    return (
      <Container>
        <DashboardMenu />
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
      <DashboardMenu />
      <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {urls.data.urls.map((url: any, index: number) => {
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
        {/* Pagination controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            sx={{ mr: 1 }}
          >
            Previous
          </Button>
          <Typography sx={{ alignSelf: 'center', mx: 2 }}>
            Page {page}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={urls.data.urls.length < pageSize}
            sx={{ ml: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
