
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = ({ chartData, selectedYear }) => {


    return (
        < Bar
            data={chartData}
            height={400}
            width={750}
            options={{
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: `Monthly Data for ${selectedYear}`,
                    },
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                return `₹${tooltipItem.raw}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: "Month",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Amount (₹)",
                        },
                        beginAtZero: true,
                    },
                },
            }
            }
        />
    );
};

export default BarGraph;
