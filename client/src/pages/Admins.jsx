// Importing required modules
import React, { useState, useEffect } from "react";

// Importing mui components
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

// Importing our custom components
import Header from "../components/Header";


const Admins = () => {
	const theme = useTheme();
	const [data, setData] = useState([]);

	const columns = [
		{
			field: 'AdminID',
			headerName: 'Admin ID',
			width: 80,
			editable: false
		},
		{
			field: 'AdminName',
			headerName: 'Username',
			width: 100,
			editable: true
		},
		{
			field: 'AdminEmail',
			headerName: 'Email',
			width: 180,
			editable: true
		},
		{
			field: 'AdminPhone',
			headerName: 'Phone',
			width: 90,
			editable: true
		},
		{
			field: 'AdminAddress',
			headerName: 'Address',
			width: 150,
			editable: true
		},
		{
			field: 'AdminCity',
			headerName: 'City',
			width: 100,
			editable: true
		},
		{
			field: 'AdminState',
			headerName: 'State',
			width: 100,
			editable: true
		},
		{
			field: 'AdminCountry',
			headerName: 'Country',
			width: 150,
			editable: true
		}
	];

	// Effect to trigger fetching data whenever any changes happens
	useEffect(() => {
		fetchData();
	}, []);

	// Function to fetch the data from the server
	const fetchData = async () => {
		try {
			const response = await fetch("/api/admins/getAdmins", {
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
			const response = await fetch(`/api/admins/updateAdmin/${updatedRow.AdminID}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedRow)
			});

			if (response.ok) {
				console.log("Admin updated successfully!");
				// Refresh data after update
				fetchData();
			} else {
				console.error("Failed to update Admin:", response.statusText);
			}
		} catch (error) {
			console.error('Error updating Admin:', error);
		}
	};

	// Fucntion to handle the Delete Rows feature
	const handleDeleteRow = async (rowToDelete) => {
		try {
			const response = await fetch(`/api/admins/deleteAdmin/${rowToDelete.AdminID}`, {
				method: "DELETE"
			});

			if (response.ok) {
				console.log("Admin deleted successfully!");
				// Remove the deleted row from the data array
				setData(prevData => prevData.filter(row => row.AdminID !== rowToDelete.AdminID));
			} else {
				console.error("Failed to delete Admin:", response.statusText);
			}
		} catch (error) {
			console.error('Error deleting Admin:', error);
		}
	};

	return (
		<Box m="1rem" overflow="hidden" display="flex" flexDirection="column">
			<Header title="Admins" subtitle="List of Admins" buttonText="Add Admin" route="/Admins/addAdmin" />
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
					getRowId={(row) => row.AdminID}
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

export default Admins;
