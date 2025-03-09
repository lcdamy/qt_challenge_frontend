"use client";
import { Box, Button, Container, FormHelperText, TextField, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSession } from 'next-auth/react';
import { longUrlSchema } from '@/libs/linkValidation';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const Home = () => {

  const [open, setOpen] = React.useState(false);
  const [myLink, setMyLink] = React.useState('');
  const [err, setErr] = React.useState(false);
  const [myshort_code, setMyShortCode] = React.useState('');

  const { data: session, status } = useSession();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const accessToken = session?.user?.token;

  const handleClickOpen = async () => {
    const longUrl = (document.getElementById('longUrl') as HTMLInputElement).value;
    const { error } = longUrlSchema.validate({ longUrl });
    if (error) {
      setMyLink(error.message);
      setErr(true);
    } else if (status === 'unauthenticated') {
      setMyLink('You must be logged in to use this feature');
      setErr(true);
    } else {
      try {
        const response = await fetch(`${apiUrl}/shorten`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ long_url: longUrl }),
        });
        const data = await response.json();
        if (data.success) {
          setErr(false);
          setMyLink(`${apiUrl}/${data.data.short_code}`);
          setOpen(true);
          setMyShortCode(data.data.short_code);
          return;
        } else {
          setMyLink(data.message);
        }
        setErr(true);
      } catch (error) {
        console.error('An unexpected error happened:', error);
        setErr(true);
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ height: '100vh', padding: '0', margin: '0', color: "white", backgroundImage: 'url(/stars.svg), url(/stars.svg)', backgroundRepeat: 'repeat-x', backgroundColor: '#0b1736' }}>
      <Container >
        <Box sx={{ padding: '50px 0', textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }} >
            Build stronger digital connections
          </Typography>

          <Typography variant="h5" component="p" gutterBottom sx={{ marginTop: '40px', marginBottom: '40px' }}>
            Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the Bitly Connections Platform.
          </Typography>
          <Box sx={{ marginTop: '20px' }}>
            <Button variant="outlined" color="error" size='large' sx={{ marginRight: '20px', ':focus': { bgcolor: '#e65100', color: '#fff' } }}>
              <Image src="/link-icon.svg" alt="Features" width={20} height={20} /> <span>&nbsp;&nbsp; Short Link </span>
            </Button>
            <Button variant="outlined" color="primary" size='large' sx={{ marginRight: '20px', ':focus': { bgcolor: '#01579b', color: '#fff' } }}>
              <Image src="/qr-icon.svg" alt="Features" width={20} height={20} /> <span>&nbsp;&nbsp;  QR Codedd </span>
            </Button>
          </Box>

          <Box sx={{ marginTop: '20px', backgroundColor: '#fff', padding: '40px', borderRadius: '10px', color: "#000" }}>
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
              name='longUrl'
              id='longUrl'
              sx={{ marginTop: '20px' }}
            />
            <Button onClick={handleClickOpen} variant='contained' size='large' sx={{ marginTop: '20px', display: 'flex', borderRadius: '10px', backgroundColor: "#0058dd", fontWeight: 300, ':hover': { bgcolor: '#0b1736', color: '#fff' } }}>
              Get your link for free <ArrowForwardIcon />
            </Button>
            {err && <FormHelperText error>{myLink}</FormHelperText>}
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>
              Sign up for free. Your free plan includes:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px', justifyContent: 'center' }}>
              <Image src="/orange-checkmark.svg" alt="Features" width={20} height={20} />
              <Typography variant="body1" component="span" sx={{ marginLeft: '10px', marginRight: '20px' }}>5 short links/month</Typography>
              <Image src="/orange-checkmark.svg" alt="Features" width={20} height={20} />
              <Typography variant="body1" component="span" sx={{ marginLeft: '10px', marginRight: '20px' }}>3 custom back-halves/month</Typography>
              <Image src="/orange-checkmark.svg" alt="Features" width={20} height={20} />
              <Typography variant="body1" component="span" sx={{ marginLeft: '10px' }}>Unlimited custom links</Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: '20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <Image src="/curology-3.svg" alt="Features" width={120} height={60} />
            <Image src="/rad-bikes-3.svg" alt="Features" width={120} height={60} />
            <Image src="/novasol-1.svg" alt="Features" width={120} height={60} />
            <Image src="/new-york-times-1.svg" alt="Features" width={120} height={60} />
            <Image src="/smalls.svg" alt="Features" width={120} height={60} />
          </Box>
        </Box>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: 'absolute',
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers sx={{ minWidth: '500px' }}>
            <Typography gutterBottom>
              {myLink}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {
                  navigator.clipboard.writeText(`${apiUrl}/${myshort_code}?utm_source=true`);
                  setOpen(true);
                }}>
              <ContentCopyIcon /> Copy Link
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </Container >
    </Box>
  );
};

export default Home;