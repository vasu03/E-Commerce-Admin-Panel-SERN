// Importing required modules
import React, { useState, useEffect, useMemo } from "react"

// Importing React Date Picker modules
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

// Importing mui components
import { Box, useTheme } from "@mui/material"

// Importing Line Chart
import { ResponsiveLine } from "@nivo/line";

// Importing custom components
import Header from "../components/Header"

// Creating our Daily Sales Chart
const Daily = () => {
    const [startDate, setStartDate] = useState(new Date("2024-04-01"));
    const [endDate, setEndDate] = useState(new Date("2024-04-31"));
    const [data, setData] = useState(null);
    const theme = useTheme();

    // Function to fetch the dat from server
    const fetchData = async () => {
        try {
            const response = await fetch("/api/sales/getDailySales", {
                method: "GET",
            });
            const responseData = await response.json();

            // Format the data to make it compatible with Line Chart
            const formattedData = responseData
                .filter(item => {
                    const orderDate = new Date(item.OrderDate.split("T")[0]);
                    return orderDate >= startDate && orderDate <= endDate;
                })
                .map(item => ({
                    x: item.OrderDate.split("T")[0],
                    y: parseFloat(item.TotalSalesAmount)
                }));
            setData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Effect to trigger to fetchData() when the Dates Changes
    useEffect(() => {
        fetchData();
    }, [startDate, endDate]);

    // Memo to memonize the formattedData on the basis of parameter Data
    const formattedData = useMemo(() => {
        if (!data) return [];
        return [{ id: "totalSales", data }];
    }, [data]);

    // JSX to render our Chart
    return (
        <Box m="1rem">
            <Header
                title="Daily Chart"
                subtitle="See your Daily Sales details/chart here."
            />
            <Box height="75vh" overflow="hidden">
              {/* Date Pickers to set range of Data to be shown */}
                <Box display="flex" justifyContent="flex-end" gap="1rem" overflow="hidden">
                    <DatePicker
                        id="startDatePicker"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker
                        id="endDatePicker"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </Box>

                {/* If data available then only show chart */}
                {data ? (
                    <ResponsiveLine
                        data={formattedData}
                        theme={{
                          axis: {
                            domain: {
                              line: {
                                stroke: theme.palette.secondary[200],
                              },
                            },
                            legend: {
                              text: {
                                fill: theme.palette.secondary[200],
                              },
                            },
                            ticks: {
                              line: {
                                stroke: theme.palette.secondary[200],
                                strokeWidth: 1,
                              },
                              text: {
                                fill: theme.palette.secondary[200],
                              },
                            },
                          },
                          legends: {
                            text: {
                              fill: theme.palette.secondary[200],
                            },
                          },
                          tooltip: {
                            container: {
                              color: theme.palette.primary[400],
                            },
                          },
                        }}
                        margin={{ top: 20, right: 100, bottom: 100, left: 70 }}
                        xScale={{ type: "point" }}
                        yScale={{
                            type: "linear",
                            min: "auto",
                            max: "auto",
                            stacked: false,
                            reverse: false,
                        }}
                        yFormat=" >-.2f"
                        curve="monotoneX"
                        colors={{ scheme: "set2" }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: "left",
                            tickSize: 3,
                            tickPadding: 3,
                            tickRotation: -45,
                            legend: "Date",
                            legendOffset: 60,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            orient: "left",
                            tickValues: 5,
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: "Total Sales",
                            legendOffset: -60,
                            legendPosition: "middle",
                        }}
                        enableGridX={false}
                        enableGridY={false}
                        pointSize={10}
                        pointColor={theme.palette.secondary[200]}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={12}
                        useMesh={true}
                        motionConfig="wobbly"
                    />
                ) : (
                    <>Loading...</>
                )}
            </Box>
        </Box>
    );
};

// Exporting the Daily Sales Chart
export default Daily;
