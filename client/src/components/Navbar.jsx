// Importing required modules
import React from 'react';
import { useDispatch } from 'react-redux';

// Importing mui components
import { AppBar, Avatar, IconButton, Toolbar, useTheme, Box } from '@mui/material';

// Importing mui icons
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon } from '@mui/icons-material'

// Importing custom  global States
import { setMode } from '../states/index';

// Creating the Navbar component
const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    
    const dispatch = useDispatch();
    const theme = useTheme();

    // JSX to render our component
    return (
        // Navbar Properties and Elements
        <AppBar
            sx={{
                position: "static",
                background: theme.palette.background.alt,
                boxShadow: "none",

            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* LEFT SIDE NavBar */}
                <IconButton onClick={() => { setIsSidebarOpen(!isSidebarOpen) }}>
                    <MenuIcon />
                </IconButton>

                {/* RIGHT SIDE NavBar */}
                <Box display="flex" gap="1rem" justifyContent="space-between">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Avatar />
                </Box>

            </Toolbar>
        </AppBar>
    );
};

// Exporting our NavBar component
export default Navbar;