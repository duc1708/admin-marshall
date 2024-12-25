import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các component cần thiết của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ stats }) => {
  // Dữ liệu để hiển thị biểu đồ
  const data = {
    labels: ["Hôm nay", "Tuần này", "Tháng này", "Năm nay"],
    datasets: [
      {
        label: "Tổng số tiền (VND)",
        data: [
          stats.salesToday,
          stats.salesThisWeek,
          stats.salesThisMonth,
          stats.salesThisYear,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu thanh biểu đồ
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền thanh biểu đồ
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình các tùy chọn hiển thị biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê doanh thu",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartComponent;
