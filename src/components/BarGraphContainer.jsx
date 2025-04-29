import React, { useState, useEffect } from "react";
import BarGraph from "./BarGraph";
import { useSelector } from "react-redux";

const BarGraphContainer = () => {

    const expenseData = useSelector(store => store.expense.expenseData);

    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });



    useEffect(() => {
        const monthlyTotals = new Array(12).fill(0);

        expenseData.forEach((item) => {
            const itemDate = new Date(item.date);
            const itemYear = itemDate.getFullYear();
            const itemMonth = itemDate.getMonth();

            if (itemYear === parseInt(selectedYear)) {
                const amount = parseFloat(item.amount);
                monthlyTotals[itemMonth] += amount;
            }
        });

        // Round each month's total to 2 decimal places
        const roundedMonthlyTotals = monthlyTotals.map(total => parseFloat(total.toFixed(2)));

        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];

        setChartData({
            labels: months,
            datasets: [
                {
                    label: `Monthly Expenses for ${selectedYear}`,
                    data: roundedMonthlyTotals,
                    backgroundColor: "#4BC0C0",
                    borderColor: "#36A2EB",
                    borderWidth: 1,
                },
            ],
        });
    }, [selectedYear, expenseData]);


    return (
        <div className="mx-auto p-4 bg-white rounded-xl shadow-md">
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

export default BarGraphContainer;