import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Container } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function createData(id: string, calories: string, fat: string) {
  return { id, calories, fat };
}

const rows = [
  createData("001", "http://localhost:3005/dashboard", "http://localhost:3005/dashboard"),
  createData("001", "http://localhost:3005/dashboard", "http://localhost:3005/dashboard"),
  createData("001", "http://localhost:3005/dashboard", "http://localhost:3005/dashboard"),

];

export default function Dashboard() {
  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <Box>
          <Button href="/" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}> Shorten URL </Button>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Shorten Version</TableCell>
              <TableCell align="left">Orginal Version</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <a href={`/dashboard/${row.id}`} style={{ display: 'flex', alignItems: 'center' }}>
                      <VisibilityIcon sx={{ cursor: 'pointer', ':hover': { color: '#0b1736' } }} />
                    </a>
                    <ContentCopyIcon sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
