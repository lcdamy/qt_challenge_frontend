"use client";
import * as React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useSWR from 'swr';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/dashboard/login');
    }
  }, [status, router]);

  const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

  if (status === "loading") {
    return <p>Loading...</p>; 
  }

  if (!session) {
    return null;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Shorten links</h1>
        <Box>
          <Button href="/" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Shorten URL</Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;
            return (
              <ListItem key={value} secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <ContentCopyIcon />
                </IconButton>
              } disablePadding>
                <ListItemButton role={undefined} dense component="a" href={`dashboard/${value.toString()}`}>
                  <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}
