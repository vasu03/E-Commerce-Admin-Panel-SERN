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

const Category = () => {
	const theme = useTheme();
	const [data, setData] = useState([]);

	const columns = [
		{
			field: 'CategoryID',
			headerName: 'Category ID',
			width: 130,
			editable: false
		},
		{
			field: 'Name',
			headerName: 'Name',
			width: 180,
			editable: true
		},
		{
			field: 'createdAt',
			headerName: 'Created At',
			width: 200,
		},
		{
			field: 'updatedAt',
			headerName: 'Updated At',
			width: 200,
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
			const response = await fetch("/api/categories/getCategories", {
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
			const response = await fetch(`/api/categories/updateCategory/${updatedRow.CategoryID}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(updatedRow)
			});

			if (response.ok) {
				console.log("Category updated successfully!");
				// Refresh data after update
				fetchData();
			} else {
				console.error("Failed to update Category:", response.statusText);
			}
		} catch (error) {
			console.error('Error updating Category:', error);
		}
	};

	// Fucntion to handle the Delete Rows feature
	const handleDeleteRow = async (rowToDelete) => {
		try {
			const response = await fetch(`/api/categories/deleteCategory/${rowToDelete.CategoryID}`, {
				method: "DELETE"
			});

			if (response.ok) {
				console.log("Category deleted successfully!");
				// Remove the deleted row from the data array
				setData(prevData => prevData.filter(row => row.CategoryID !== rowToDelete.CategoryID));
			} else {
				console.error("Failed to delete Category:", response.statusText);
			}
		} catch (error) {
			console.error('Error deleting Category:', error);
		}
	};

	return (
		<Box m="1rem" overflow="hidden" display="flex" flexDirection="column">
			<Header title="Categories" subtitle="List of Categorys" buttonText="Add Category" route="/categories/addCategory" />
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
					getRowId={(row) => row.CategoryID}
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

export default Category;
