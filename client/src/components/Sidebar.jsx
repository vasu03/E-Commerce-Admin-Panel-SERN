// Importing required modules
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Importing mui components
import { Box, Drawer, IconButton, Typography, useTheme, } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from "@mui/material";

// Importing mui icons
import { CloseOutlined, ChevronRightOutlined } from "@mui/icons-material";
import { Groups2Outlined, ReceiptLongOutlined, ShoppingCartOutlined, CategoryOutlined } from "@mui/icons-material";
import { PointOfSaleOutlined, TodayOutlined, CalendarMonthOutlined, AdminPanelSettingsOutlined, PieChartOutlineOutlined } from "@mui/icons-material";

const navItems = [
  { text: "Client Facing", icon: null, },
  { text: "Customers", icon: <Groups2Outlined />, },
  { text: "Orders", icon: <ReceiptLongOutlined />, },
  { text: "Products", icon: <ShoppingCartOutlined />, },
  { text: "Categories", icon: <CategoryOutlined />, },
  { text: "Sales", icon: null, },
  { text: "Overview", icon: <PointOfSaleOutlined />, },
  { text: "Daily", icon: <TodayOutlined />, },
  { text: "Monthly", icon: <CalendarMonthOutlined />, },
  { text: "Breakdown", icon: <PieChartOutlineOutlined />, },
  { text: "Management", icon: null, },
  { text: "Admins", icon: <AdminPanelSettingsOutlined />, },
];

// Creating the Sidebar component
const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {

  const { pathname } = useLocation(); // to grab the path that we are currently at
  const [active, setActive] = useState("");
  const navigate = useNavigate(); // to navigate to other pages
  const theme = useTheme(); // to get the theme and colors

  // Set the custom scrollbar styles
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
        ::-webkit-scrollbar {
            width: 3px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: ${theme.palette.secondary[200]};
            border-radius: 3px;
        }
        `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [theme]);

  // anytime pathname changes...we're going to setActive value to current page(URL)
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // JSX to render our sidebar component
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => {
            setIsSidebarOpen(false);
          }}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {     // to change the predef prop by mui for drawer
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box margin="1.5rem 0rem 1.5rem 1rem" display="flex" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Typography variant="h4" fontWeight="bold">
                  Admin Panel
                </Typography>
              </Box>
              {!isNonMobile && (
                <IconButton
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              )}
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "1.5rem 0 1rem 2rem", fontWeight: "bold" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

// Exporting our Sidebar component
export default Sidebar;