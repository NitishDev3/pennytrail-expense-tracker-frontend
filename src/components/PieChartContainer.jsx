import { useEffect, useState } from "react";
import PieChart from "./PieChart";
import { useSelector } from "react-redux";


const PieChartContainer = () => {

    const expenseData = useSelector(store => store.expense.expenseData);

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [selectedFilter, setSelectedFilter] = useState("lastWeek");

    useEffect(() => {
        const now = new Date();

        const filteredData = expenseData.filter((item) => {
            const itemDate = new Date(item.date);
            const diffInDays = (now - itemDate) / (1000 * 60 * 60 * 24);

            if (selectedFilter === "lastWeek") {
                return diffInDays <= 7;
            } else if (selectedFilter === "lastMonth") {
                return diffInDays <= 30;
            }
            return true; 
        });

        const categoryTotals = filteredData.reduce((acc, item) => {
            const amount = parseFloat(item.amount);
            acc[item.category] = (acc[item.category] || 0) + amount;
            return acc;
        }, {});

        const roundedCategoryTotals = {};
        Object.keys(categoryTotals).forEach((category) => {
            roundedCategoryTotals[category] = parseFloat(categoryTotals[category].toFixed(2));
        });

        const totalAmount = Object.values(roundedCategoryTotals).reduce((sum, val) => sum + val, 0);

        const labels = Object.entries(roundedCategoryTotals).map(([category, amount]) => {
            const percentage = totalAmount > 0 ? ((amount / totalAmount) * 100).toFixed(1) : 0;
            return `${category} (${percentage}% - ₹${amount})`;
        });

        const data = Object.values(roundedCategoryTotals);

        setChartData({
            labels,
            datasets: [
                {
                    data,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                    ],
                    hoverBackgroundColor: [
                        "#FF6384aa",
                        "#36A2EBaa",
                        "#FFCE56aa",
                        "#4BC0C0aa",
                        "#9966FFaa",
                        "#FF9F40aa",
                    ],
                },
            ],
        });
    }, [selectedFilter, expenseData]);



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