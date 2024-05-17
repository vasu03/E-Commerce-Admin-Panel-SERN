// Importing required modules
import React, { useState, useEffect } from "react";

// Importing mui components
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// Importing mui icons
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Importing our custom components
import Header from "../components/Header";

const Order = () => {
	const theme = useTheme();
	const [data, setData] = useState([]);

	const columns = [
		{
			field: 'OrderID',
			headerName: 'ID',
			width: 80,
			editable: false
		},
		{
			field: 'TotalAmount',
			headerName: 'Amount (₹)',
			width: 100,
			editable: true
		},
		{
			field: 'SellerID',
			headerName: 'SellerID',
			width: 70,
			editable: true
		},
		{
			field: 'CustomerID',
			headerName: 'Cust-ID',
			width: 70,
			editable: true
		},
		{
			field: 'OrderDate',
			headerName: 'PlacedOn',
			width: 180,
			editable: true
		},
		{
			field: 'TotalItems',
			headerName: 'Items',
			width: 80,
			editable: true
		},
		{
			field: 'DeliveryDate',
			headerName: 'DeliveryOn',
			width: 180,
			editable: true
		},
		{
			field: 'ShippingStatus',
			headerName: 'Status',
			width: 100,
			editable: true
		},
		{
			field: 'PaymentMethod',
			headerName: 'Payment',
			width: 100,
			editable: true
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 180,
			renderCell: (params) => (
				<strong>
					<Button
						variant="outlined"
						color = "info"
						id="saveBtn"
						size="small"
						style={{ marginLeft: 0 }}
						onClick={() => handleUpdateRow(params.row)}
					>
						<SaveIcon />
					</Button>
					<Button
						variant="outlined"
						color="error"
						id="deleteBtn"
						size="small"
						style={{ marginLeft: 10 }}
						onClick={() => handleDeleteRow(params.row)}
					>
						<DeleteForeverIcon />
					</Button>
				</strong>
			)
		}
	];

	// Effect to trigger fetching data whenever any changes happens
	useEffect(() => {
		fetchData();
	}, []);

	// Function to fetch the data from the server
	const fetchData = async () => {
		try {
			const response = await fetch("/api/orders/getOrders", {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				},
			});
			const data = await response.json();
			setData(data);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	// Fucntion to handle the Update Rows feature
	const handleUpdateRow = async (updatedRow) => {
		try {
			// Parse and format date-time values
			const formattedOrderDate = new Date(updatedRow.OrderDate).toISOString().slice(0, 19).replace('T', ' ');
			const formattedDeliveryDate = updatedRow.DeliveryDate ? new Date(updatedRow.DeliveryDate).toISOString().slice(0, 19).replace('T', ' ') : null;
	
			// Construct the updated row object with formatted date-time values
			const updatedRowData = {
				...updatedRow,
				OrderDate: formattedOrderDate,
				DeliveryDate: formattedDeliveryDate
			};
	
			// Send the PUT request with the updated row data
			const response = await fetch(`/api/orders/updateOrder/${updatedRow.OrderID}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedRowData)
			});
	
			if (response.ok) {
				console.log("Order updated successfully!");
				// Refresh data after update
				fetchData();
			} else {
				console.error("Failed to update Order:", response.statusText);
			}
		} catch (error) {
			console.error('Error updating Order:', error);
		}
	};
	

	// Function to handle the Delete Rows feature
const handleDeleteRow = async (rowToDelete) => {
    try {
        const response = await fetch(`/api/orders/deleteOrder/${rowToDelete.OrderID}`, {
            method: "DELETE"
        });

        if (response.ok) {
            // Delete operation succeeded
            console.log("Order deleted successfully!");
            // Remove the deleted row from the data array
            setData(prevData => prevData.filter(row => row.OrderID !== rowToDelete.OrderID));
        } else {
            // Delete operation failed
            console.error("Failed to delete Order:", response.statusText);
            // Log the response body for further investigation
            const responseBody = await response.json();
            console.error("Response body:", responseBody);
        }
    } catch (error) {
        // Network error or other exceptions
        console.error('Error deleting Order:', error);
    }
};


	return (
		<Box m="1rem" overflow="hidden" display="flex" flexDirection="column">
			<Header title="Orders" subtitle="List of Orders" buttonText="Add Order" route="/orders/addOrder" />
			<Box
				overflow="hidden"
				mt="1rem"
				height="75vh"
				sx={{
					"& .MuiDataGrid-root": {
						border: "none"
					},
					"& .MuiDataGrid-cell": {
						borderBottom: "none"
					},
					"& .MuiDataGrid-columnHeaders": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[300],
						borderBottom: "none",
						fontSize: ".9rem",
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: theme.palette.background.alt,
						color: theme.palette.secondary[300],
						borderTop: "none",
					},
				}}
			>
				<DataGrid
					getRowId={(row) => row.OrderID}
					rows={data}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10, 25, 50]}
					pagination
          			checkboxSelection
				/>
			</Box>
		</Box>
	);
};

export default Order;
