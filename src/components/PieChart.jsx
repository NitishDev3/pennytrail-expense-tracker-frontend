import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Sample API data


const PieChart = ({ chartData }) => {

    // console.log(chartData);


    return (

        <Pie
            data={chartData}
            width={400} // smaller width
            height={400} // smaller height
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            generateLabels: (chart) => {
                                const data = chart.data;
                                return data.labels.map((label, i) => {
                                    return {
                                        text: label.split(' (')[0], // This will only take the category name before the bracket
                                        fillStyle: data.datasets[0].backgroundColor[i],
                                        strokeStyle: data.datasets[0].backgroundColor[i],
                                        index: i,
                                    };
                                });
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                const value = tooltipItem.raw;
                                const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${tooltipItem.label}: ₹${value} (${percentage}%)`;
                            },
                        },
                    },
                    datalabels: {
                        display: true,
                        color: 'white',
                        formatter: (value, context) => {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${percentage}%\n(₹${value})`;
                        },
                        font: {
                            weight: "bold",
                            size: 12,
                        },
                    },
                },
            }}
        />
    );
};

export default PieChart;
