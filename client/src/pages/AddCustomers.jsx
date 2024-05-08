import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";

const AddCustomer = () => {
    const theme = useTheme();

    const [formData, setFormData] = useState({
        Username: "",
        Password: "",
        Email: "",
        Phone: "",
        Address: "",
        City: "",
        State: "",
        Country: ""
    });
    const [addSuccess, setAddSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/customers/addCustomer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setAddSuccess("Customer added successfully...");
                setFormData({
                    Username: "",
                    Password: "",
                    Email: "",
                    Phone: "",
                    Address: "",
                    City: "",
                    State: "",
                    Country: ""
                });
            } else {
                console.error("Failed to add customer.");
            }
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    return (
        <Box m="1rem" overflow="hidden" display="flex" flexDirection="column" justifyContent="space-between">
            <Header title="Add Customer" subtitle="Add a new customer here" />
            <form
                onSubmit={handleSubmit}
                style={{
                    alignSelf: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                    height: "50%",
                    gap: "1rem"
                }}
            >
                {Object.keys(formData).map((key) => (
                    <Box
                        key={key}
                        width="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap="1rem"
                    >
                        <label>{key}:</label>
                        <input
                            style={{
                                width: "60%",
                                background: "#d0d0d011",
                                border: "1px solid",
                                borderColor: theme.palette.secondary[300],
                                borderRadius: "5px",
                                padding: ".5rem .5rem",
                                color: theme.palette.primary[100],
                                outline: "none"
                            }}
                            type={key === 'Password' ? 'password' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    </Box>
                ))}
                <button
                    style={{
                        width: "40%",
                        background: "#d0d0d011",
                        border: "1px solid",
                        borderColor: theme.palette.secondary[300],
                        borderRadius: "5px",
                        padding: ".5rem .5rem",
                        color: theme.palette.primary[100],
                        outline: "none",
                        alignSelf: "center"
                    }}
                    type="submit"
                >
                    Add Customer
                </button>
            </form>
            {addSuccess && (
                <Box 
                    border="#99eebb88" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center" 
                    padding=".9rem" 
                    width="30%"
                    margin="1rem" 
                    alignSelf="center" 
                    borderRadius="10px"
                    backgroundColor="#99eebb78"
                    color = {theme.palette.primary[600]}
                    fontSize="1.05rem"
                >
                    {addSuccess}
                </Box>
            )}
        </Box>
    );
};

export default AddCustomer;
