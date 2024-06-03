import React, { useState, useEffect, useMemo } from "react"
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import { Box, useTheme } from "@mui/material"
import { ResponsiveLine } from "@nivo/line";
import Header from "../components/Header"

const Monthly = () => {
    const [startYear, setStartYear] = useState(new Date(2023, 0, 1)); // Initialize with January 1st, 2023
    const [endYear, setEndYear] = useState(new Date(2024, 11, 31)); // Initialize with December 31st, 2024
    const [data, setData] = useState(null);
    const theme = useTheme();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/sales/getMonthlySales", {
                method: "GET",
            });
            const responseData = await response.json();

            const formattedData = responseData.filter(item => {
                const orderDate = new Date(item.Year, item.Month - 1);
                return orderDate >= startYear && orderDate <= endYear;
            }).map(item => ({
                x: `${new Date(item.Year, item.Month - 1).toLocaleString('default', { month: 'short' })} ${item.Year}`, // Format the date as "Month Year"
                y: parseFloat(item.TotalSalesAmount)
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
                title="Monthly Chart"
                subtitle="See your Monthly Sales details/chart here."
            />
            <Box height="75vh" overflow="hidden">
				{/* Date Pickers to set range of Data to be shown */}
                <Box display="flex" justifyContent="flex-end" gap="1rem" overflow="hidden">
                    <DatePicker
                        id="startDatePicker"
                        selected={startYear}
                        onChange={(date) => setStartYear(date)}
                        dateFormat="yyyy"
                        showYearPicker
                        scrollableYearDropdown
                    />
                    <DatePicker
                        id="endDatePicker"
						selected={endYear}
                        onChange={(date) => setEndYear(date)}
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

export default Monthly;
