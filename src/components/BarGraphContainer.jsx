import React, { useState, useEffect } from "react";
import BarGraph from "./BarGraph";

const BarGraphContainer = () => {
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    // Sample data for the past 3 years (replace with actual data from your API)
    const sampleData = {
        2023: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 500)), // Random data for 2023
        2024: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 500)), // Random data for 2024
        2025: Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 500)), // Random data for 2025
    };

    useEffect(() => {
        // Prepare data for the selected year
        const selectedData = sampleData[selectedYear];
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        setChartData({
            labels: months,
            datasets: [
                {
                    label: `Monthly Data for ${selectedYear}`,
                    data: selectedData,
                    backgroundColor: "#4BC0C0", // Color for bars
                    borderColor: "#36A2EB",
                    borderWidth: 1,
                },
            ],
        });
    }, [selectedYear]);
    return (
        <div className="mx-auto p-4 bg-white rounded-xl shadow-md">
            {/* Select for Year */}
            <div className="mb-4 text-right">
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                >
                    <option value={currentYear}>This Year ({currentYear})</option>
                    <option value={currentYear - 1}>Last Year ({currentYear - 1})</option>
                    <option value={currentYear - 2}>Two Years Ago ({currentYear - 2})</option>
                </select>
            </div>
            <BarGraph chartData={chartData} selectedYear={selectedYear} />
        </div>
    )
}

export default BarGraphContainer