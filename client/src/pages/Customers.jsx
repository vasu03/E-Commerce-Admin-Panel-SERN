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


const Customers = () => {
	const theme = useTheme();
	const [data, setData] = useState([]);

	const columns = [
		{
			field: 'CustomerID',
			headerName: 'ID',
			width: 80,
			editable: false
		},
		{
			field: 'Username',
			headerName: 'Username',
			width: 100,
			editable: true
		},
		{
			field: 'Email',
			headerName: 'Email',
			width: 180,
			editable: true
		},
		{
			field: 'Phone',
			headerName: 'Phone',
			width: 90,
			editable: true
		},
		{
			field: 'Address',
			headerName: 'Address',
			width: 150,
			editable: true
		},
		{
			field: 'City',
			headerName: 'City',
			width: 100,
			editable: true
		},
		{
			field: 'State',
			headerName: 'State',
			width: 100,
			editable: true
		},
		{
			field: 'Country',
			headerName: 'Country',
			width: 150,
			editable: true
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 200,
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
						style={{ marginLeft: 16 }}
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
			const response = await fetch("/api/customers/getCustomers", {
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
			const response = await fetch(`/api/customers/updateCustomer/${updatedRow.CustomerID}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedRow)
			});

			if (response.ok) {
				console.log("Customer updated successfully!");
				// Refresh data after update
				fetchData();
			} else {
				console.error("Failed to update customer:", response.statusText);
			}
		} catch (error) {
			console.error('Error updating customer:', error);
		}
	};

	// Fucntion to handle the Delete Rows feature
	const handleDeleteRow = async (rowToDelete) => {
		try {
			const response = await fetch(`/api/customers/deleteCustomer/${rowToDelete.CustomerID}`, {
				method: "DELETE"
			});

			if (response.ok) {
				console.log("Customer deleted successfully!");
				// Remove the deleted row from the data array
				setData(prevData => prevData.filter(row => row.CustomerID !== rowToDelete.CustomerID));
			} else {
				console.error("Failed to delete customer:", response.statusText);
			}
		} catch (error) {
			console.error('Error deleting customer:', error);
		}
	};

	return (
		<Box m="1rem" overflow="hidden" display="flex" flexDirection="column">
			<Header title="Customers" subtitle="List of Customers" buttonText="Add Customer" route="/customers/addCustomer" />
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
					getRowId={(row) => row.CustomerID}
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

export default Customers;
