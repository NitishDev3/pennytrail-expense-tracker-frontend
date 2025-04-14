import { useEffect, useState } from "react";
import PieChart from "./PieChart";

const sampleApiData = [
    { date: "2025-04-05", amount: "120", category: "Food" },
    { date: "2025-04-06", amount: "50", category: "Transport" },
    { date: "2025-04-07", amount: "200", category: "Shopping" },
    { date: "2025-04-07", amount: "100", category: "Food" },
    { date: "2025-04-08", amount: "80", category: "Bills" },
    { date: "2025-04-09", amount: "60", category: "Transport" },
    { date: "2025-03-07", amount: "550", category: "Shopping" },
    { date: "2025-03-07", amount: "130", category: "Food" },
    { date: "2025-03-08", amount: "80", category: "Bills" },
    { date: "2025-03-09", amount: "640", category: "Transport" },
];

const PieChartContainer = () => {

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedFilter, setSelectedFilter] = useState("lastWeek");

    // console.log(chartData)

    useEffect(() => {
        // Filter data based on selected filter (you can enhance this for real dates)
        const filteredData = sampleApiData.filter((item) => {
            if (selectedFilter === "lastWeek") return true; // Add real date logic
            if (selectedFilter === "lastMonth") return true; // Add real date logic
            return true;
        });

        // Group by category and sum amounts
        const categoryTotals = filteredData.reduce((acc, item) => {
            const amount = parseFloat(item.amount);
            acc[item.category] = (acc[item.category] || 0) + amount;
            return acc;
        }, {});

        const totalAmount = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);

        const labels = Object.entries(categoryTotals).map(([category, amount]) => {
            const percentage = ((amount / totalAmount) * 100).toFixed(1);
            return `${category} (${percentage}% - ₹${amount})`;
        });

        const data = Object.values(categoryTotals);

        setChartData({
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                    hoverBackgroundColor: ["#FF6384aa", "#36A2EBaa", "#FFCE56aa", "#4BC0C0aa", "#9966FFaa"],
                },
            ],
        });
    }, [selectedFilter]);
    return (
        <div className="p-4 mx-auto bg-white rounded-xl shadow-md relative">
            <div className="mb-4 text-right">
                <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
                >
                    <option value="lastWeek">Last Week</option>
                    <option value="lastMonth">Last Month</option>
                </select>

                <PieChart chartData={chartData} />
            </div>
        </div>
    )
}

export default PieChartContainer