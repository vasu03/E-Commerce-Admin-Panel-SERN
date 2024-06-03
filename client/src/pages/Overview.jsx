import React, { useState, useEffect, useMemo } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Box, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import Header from "../components/Header";

const Overview = () => {
    const [startYear, setStartYear] = useState(2022); // Initialize with 2023
    const [endYear, setEndYear] = useState(2024); // Initialize with 2024
    const [data, setData] = useState(null);
    const theme = useTheme();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/sales/getYearlySales", {
                method: "GET",
            });
            const responseData = await response.json();

            const formattedData = responseData.filter(item => {
                return item.Year >= startYear && item.Year <= endYear;
            }).map(item => ({
                x: item.Year.toString(), // Year as x value
                y: parseFloat(item.TotalSalesAmount) // Convert TotalSalesAmount to float
            }));

            setData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startYear, endYear]);

    const formattedData = useMemo(() => {
        if (!data) return [];
        return [{ id: "totalSales", data }];
    }, [data]);

    return (
        <Box m="1rem">
            <Header
                title="Overview Chart"
                subtitle="See your Yearly Sales details/chart here."
            />
            <Box height="75vh" overflow="hidden">
                {/* Date Pickers to set range of Data to be shown */}
                <Box display="flex" justifyContent="flex-end" gap="1rem" overflow="hidden">
                    <DatePicker
                        id="startDatePicker"
                        selected={new Date(startYear, 0, 1)}
                        onChange={(date) => setStartYear(date.getFullYear())}
                        dateFormat="yyyy"
                        showYearPicker
                        scrollableYearDropdown
                    />
                    <DatePicker
                        id="endDatePicker"
                        selected={new Date(endYear, 11, 31)}
                        onChange={(date) => setEndYear(date.getFullYear())}
                        dateFormat="yyyy"
                        showYearPicker
                        scrollableYearDropdown
                    />
                </Box>

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
                            orient: "bottom",
                            tickSize: 5,
                            tickPadding: 3,
                            tickRotation: -45,
                            legend: "Year",
                            legendOffset: 60,
                            legendPosition: "middle",
                        }}
                        axisLeft={{
                            orient: "left",
                            tickValues: 5,
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: -45,
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

export default Overview;
