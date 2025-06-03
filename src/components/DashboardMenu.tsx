import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const DashboardMenu: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Shorten links</h1>
            <Box>
                <Button
                    href="/"
                    fullWidth
                    variant="contained"
                    sx={{
                        marginTop: '20px',
                        display: 'flex',
                        cursor: 'pointer',
                        borderRadius: '10px',
                        backgroundColor: "#0058dd",
                        fontWeight: 300,
                        ':hover': { bgcolor: '#0b1736', color: '#fff' }
                    }}
                >
                    Create your own shorten URL
                </Button>
            </Box>
        </Box>
    );
};

export default DashboardMenu;