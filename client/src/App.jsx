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
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Overview from "./pages/Overview";

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
          <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/customers" element={<Customers/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/overview" element={<Overview/>}/>
        </Route>
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

// Exporting our reacting App
export default App