// Importing required modules
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Importing our Custom Pages
import Layout from "./layout";
import Customers from "./pages/Customers";
import AddCustomers from "./pages/AddCustomers";
import Orders from "./pages/Orders";
import AddOrders from "./pages/AddOrders";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Categories from "./pages/Categories";
import AddCategories from "./pages/AddCatrgories";
import Overview from "./pages/Overview";
import Monthly from "./pages/Monthly";
import Daily from "./pages/Daily";
import BreakdownChart from "./pages/Breakdown";
import Admins from "./pages/Admins";

// Creating our React App
const App = () => {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  
  // JSX to render our App
  return (
    // Define a BrowserRouter to be able to route through diff endpoints
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to="/customers" replace/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/customers/addCustomer" element={<AddCustomers/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/addProduct" element={<AddProducts/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/categories/addCategory" element={<AddCategories/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/orders/addOrder" element={<AddOrders/>}/>
          <Route path="/overview" element={<Overview/>}/>
          <Route path="/monthly" element={<Monthly/>}/>
          <Route path="/daily" element={<Daily/>}/>
          <Route path="/breakdown" element={<BreakdownChart/>}/>
          <Route path="/admins" element={<Admins/>}/>
        </Route>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Exporting our reacting App
export default App