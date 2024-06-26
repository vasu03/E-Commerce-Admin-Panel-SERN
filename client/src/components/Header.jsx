// Importing required modules
import React from "react";
import { Link } from "react-router-dom";

// Importing mui components
import { Typography, useTheme, Box, Button } from "@mui/material";

// Importing mui icons
import AddIcon from '@mui/icons-material/Add';

// Creating the Header component
const Header = ({ title, subtitle, buttonText, route }) => {
    const theme = useTheme();

    // JSX to render the Header component   
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
                <Typography
                    variant="h3"
                    color={theme.palette.secondary[200]}
                    fontWeight="bold"
                    sx={{ fontSize: "22px" }}
                >
                    {title}
                </Typography>
                <Typography
                    variant="h6"
                    color={theme.palette.secondary[300]}
                    sx={{ fontSize: "12px" }}
                >
                    {subtitle}
                </Typography>
            </Box>
            { buttonText ? (
                <Button
                    component={Link} // Use Link component for navigation
                    to={route}
                    id="addBtn"
                    size="small"
                    style={{
                        display: "felx",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: ".3rem", 
                        margin: 0,
                        border: "1px solid",
                        borderColor: theme.palette.secondary[300],
                        color: theme.palette.secondary[300],
                        fontSize: ".7rem",
                        fontWeight: "600",
                        padding: ".3rem 1rem"
                    }}
                    onClick={() => handleDeleteRow(params.row)}
                    > <AddIcon/> {buttonText} </Button>
            ) : (<></>)}
            
        </Box>
    );
};

export default Header;