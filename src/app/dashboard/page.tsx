"use client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Container, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


export default function Dashboard() {

  const session = useSession();
  console.log(session);
  const router = useRouter();

  const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR('https://jsonplaceholder.tyicode.com/posts', fetcher);
  console.log(data);

  if (session.status === "loading") {
    return <div>Loading...</div>
  }

  if (session.status === "unauthenticated") {
    router.push("/dashboard/login");
  }

  if (session.status === "authenticated") {



    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Shorten links</h1>
          <Box>
            <Button href="/" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Shorten URL </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                      <ContentCopyIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} dense component="a" href={`dashboard/${value.toString()}`}>
                    <ListItemText id={labelId} primary={`Line item ${value + 1} `} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Container>
    );
  }
}
