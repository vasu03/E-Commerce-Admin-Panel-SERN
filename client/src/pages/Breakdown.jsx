// Importing required modules
import React, { useState, useEffect } from 'react'

// Importing mui components
import { Box, useTheme } from "@mui/material";

// Importing Pie Chart
import { ResponsivePie } from '@nivo/pie';

// Importing our custom components
import Header from '../components/Header';


// Creating the Breakdown Chart
const BreakdownChart = () => {
    const theme = useTheme();

    // States to handle the data
    const [data, setData] = useState(null);

    // Effect to be triggered when page loads
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch the data from the server
    const fetchData = async () => {
        try {
            const response = await fetch("/api/sales/getCategorySales", {
                method: "GET",
            });
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Format the data compatible to Chart { id: , label: , value: }
    const formattedData = data ? data.map((item, i) => ({
        id: item.CategoryName,
        label: item.CategoryName,
        value: parseFloat(item.TotalSalesAmount),
    })) : [];

    // JSX t render the Chart
    return (
        <Box m="1rem" overflow="hidden" display="flex" flexDirection="column">
            <Header
                title="Breakdown Chart"
                subtitle="See your Breakdown of Category wise Sales of Products." />
            <Box height="75vh">
                <Box position="relative" height="100%">
                    <ResponsivePie
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
                        margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
                        sortByValue={true}
                        innerRadius={0.45}
                        padAngle={1.2}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        colors={{ scheme: "set2" }}
                        borderWidth={1.5}
                        borderColor={{
                            from: 'color',
                            modifiers: [
                                [
                                    'darker',
                                    .8
                                ]
                            ]
                        }}
                        enableArcLinkLabels={true}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsDiagonalLength={20}
                        arcLinkLabelsStraightLength={36}
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsOffset={3}
                        arcLinkLabelsTextOffset={5}
                        arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
                        arcLabelsSkipAngle={15}
                        arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                justify: false,
                                translateX: 0,
                                translateY: 56,
                                itemsSpacing: 40,
                                itemWidth: 85,
                                itemHeight: 20,
                                itemTextColor: '#999',
                                itemDirection: 'left-to-right',
                                itemOpacity: 1,
                                symbolSize: 15,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: theme.palette.primary[500]
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </Box>
            </Box>
        </Box>
    );
}
// Exporting the BreakDown Chart
export default BreakdownChart;