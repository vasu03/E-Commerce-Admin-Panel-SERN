import React, { useState } from "react";
import { Box, useTheme, } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Header from "../components/Header";

const AddOrders = () => {
    const theme = useTheme();

    // States to handle thw Form data
    const [formData, setFormData] = useState({
        TotalAmount: "",
        CustomerID: "",
        OrderDate: "",
        OrderItems: [],
        Shipping: {
            ShippingStatus: "",
            DeliveryDate: ""
        },
        Payment: {
            Amount: "",
            PaymentMethod: "",
            PaymentDate: ""
        }
    });
    const [addSuccess, setAddSuccess] = useState(null);

    // Function to handle the Change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // function to handle change in Order Item inputs
    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.OrderItems];
        updatedItems[index][name] = value;
        setFormData({ ...formData, OrderItems: updatedItems });
    };

    // function to handle Add item btn
    const handleAddItem = () => {
        setFormData({
            ...formData,
            OrderItems: [...formData.OrderItems, { ProductID: "", Quantity: "", UnitPrice: "" }]
        });
    };

    // Function to handle the Remove item btn
    const handleRemoveItem = (index) => {
        const updatedItems = [...formData.OrderItems];
        updatedItems.splice(index, 1);
        setFormData({ ...formData, OrderItems: updatedItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/orders/addOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setAddSuccess("Order added successfully...");
                // Clear the form after successful submission if needed
                setFormData({
                    TotalAmount: "",
                    CustomerID: "",
                    OrderDate: "",
                    OrderItems: [],
                    Shipping: {
                        ShippingStatus: "",
                        DeliveryDate: ""
                    },
                    Payment: {
                        Amount: "",
                        PaymentMethod: "",
                        PaymentDate: ""
                    }
                });
            } else {
                console.error("Failed to add order.");
            }
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    return (
        <Box m="1rem" overflow="hidden" display="flex" flexDirection="column" justifyContent="space-between" >
            <Header title="Add Orders" subtitle="Add a new Order here" />
            <form
                onSubmit={handleSubmit}
                style={{
                    alignSelf: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: "35%",
                    height: "50%",
                    gap: ".8rem"
                }}
            >
                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Total Amount:</label>
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
                        type="text"
                        name="TotalAmount"
                        value={formData.TotalAmount}
                        onChange={handleChange} />
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Customer ID:</label>
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
                        type="text"
                        name="CustomerID"
                        value={formData.CustomerID}
                        onChange={handleChange} />
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Order Date:</label>
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
                        type="text"
                        name="OrderDate"
                        value={formData.OrderDate}
                        onChange={handleChange} />
                </Box>

                <Box width="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center" gap="1rem">
                    <label style={{ alignSelf: "flex-start" }}>Order Items:</label>
                    {formData.OrderItems.map((item, index) => (
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: ".5rem"
                            }}
                            key={index}>
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
                                type="text"
                                name="ProductID"
                                placeholder="Product ID"
                                value={item.ProductID}
                                onChange={(e) => handleItemChange(index, e)} />
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
                                type="text"
                                name="Quantity"
                                placeholder="Quantity"
                                value={item.Quantity}
                                onChange={(e) => handleItemChange(index, e)} />
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
                                type="text"
                                name="UnitPrice"
                                placeholder="Unit Price"
                                value={item.UnitPrice}
                                onChange={(e) => handleItemChange(index, e)} />
                            <button
                                style={{
                                    width: "40%",
                                    background: "#d0d0d011",
                                    border: "1px solid",
                                    borderColor: theme.palette.secondary[300],
                                    borderRadius: "5px",
                                    padding: ".5rem .5rem",
                                    color: theme.palette.primary[100],
                                    outline: "none"
                                }}
                                type="button"
                                onClick={() => handleRemoveItem(index)}><DeleteForeverIcon /></button>
                        </div>
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
                            outline: "none"
                        }}
                        type="button"
                        onClick={handleAddItem}
                    >Add Item</button>
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Shipping Status:</label>
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
                        type="text"
                        name="ShippingStatus"
                        value={formData.Shipping.ShippingStatus}
                        onChange={(e) => setFormData({ ...formData, Shipping: { ...formData.Shipping, ShippingStatus: e.target.value } })} />
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Delivery Date:</label>
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
                        type="text"
                        name="DeliveryDate"
                        value={formData.Shipping.DeliveryDate}
                        onChange={(e) => setFormData({ ...formData, Shipping: { ...formData.Shipping, DeliveryDate: e.target.value } })} />
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Payment Amount:</label>
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
                        type="text"
                        name="Amount"
                        value={formData.Payment.Amount}
                        onChange={(e) => setFormData({ ...formData, Payment: { ...formData.Payment, Amount: e.target.value } })} />
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Payment Method:</label>
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
                        type="text"
                        name="PaymentMethod"
                        value={formData.Payment.PaymentMethod}
                        onChange={(e) => setFormData({ ...formData, Payment: { ...formData.Payment, PaymentMethod: e.target.value } })} />
                </Box>

                <Box width="100%" display="flex" alignItems="center" justifyContent="space-between" gap="1rem">
                    <label>Payment Date:</label>
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
                        type="text"
                        name="PaymentDate"
                        value={formData.Payment.PaymentDate}
                        onChange={(e) => setFormData({ ...formData, Payment: { ...formData.Payment, PaymentDate: e.target.value } })} />
                </Box>

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
                    type="submit">Add Order</button>
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

export default AddOrders;
