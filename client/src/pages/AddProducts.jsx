import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";

const AddProduct = () => {
    const theme = useTheme();

    // State to handle form data
    const [formData, setFormData] = useState({
        CategoryID: "",
        SellerID: "",
        Name: "",
        Description: "",
        Price: "",
        StockQuantity: ""
    });
    const [addSuccess, setAddSuccess] = useState(null);

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/products/addProduct", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setAddSuccess("Product added successfully...");
                // Clear form fields after successful submission if needed
                setFormData({
                    CategoryID: "",
                    SellerID: "",
                    Name: "",
                    Description: "",
                    Price: "",
                    StockQuantity: ""
                });
            } else {
                console.error("Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <Box m="1rem" overflow="hidden" display="flex" flexDirection="column" justifyContent="space-between">
            <Header title="Add Product" subtitle="Add a new product here" />
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
                            type={key === 'Price' || key === 'StockQuantity' ? 'number' : 'text'}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
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
                    Add Product
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

export default AddProduct;
