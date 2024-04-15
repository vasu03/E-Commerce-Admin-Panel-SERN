// importing pre-defined modules
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// Importing mui components
import { Box, useMediaQuery } from "@mui/material";

// Importing our custom components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Layout = () => {

    // States to manage the responsiveness of the layout
    const isNonMobile = useMediaQuery("(min-width: 600px)"); // returns a bool value based on screen width
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // JSX to render our Layout
    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%" flexGrow={1}>
            {/* The SideBar */}
            <Sidebar
                isNonMobile={isNonMobile}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            {/* NavBar and Dashboard */}
            <Box flexGrow={1}>
                <Navbar
                    user={{}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />   {/* refers to all the elements after Navbar (main contents) */}
            </Box>
        </Box>
    );
};

export default Layout;