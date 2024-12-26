import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function SalesChart() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Gọi API để lấy dữ liệu
    axios.get('http://localhost:4001/api/revenue') // Thay thế URL API của bạn
      .then(response => {
        setSalesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDateChange = () => {
    // Lọc dữ liệu theo ngày
    if (startDate && endDate) {
      const filtered = salesData.filter(item => {
        const saleDate = new Date(item.ngayBan);
        return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
      });
      setFilteredData(filtered);
    }
  };

  const chartData = {
    labels: filteredData.map(item => new Date(item.ngayBan).toLocaleDateString()),
    datasets: [
      {
        label: 'Tổng tiền',
        data: filteredData.map(item => item.tongTien),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      }
    ],
  };

  return (
    <div>
      <h2>Biểu đồ doanh thu</h2>
      <div>
        <label>Chọn ngày từ: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <label> đến: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <button style={{border:'none',background:'#000', color:'#fff', marginLeft:'20px', fontSize:'13px', fontWeight:'500'}} onClick={handleDateChange}>Lọc</button>
      </div>
      {filteredData.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>Chưa có dữ liệu cho khoảng thời gian đã chọn.</p>
      )}
    </div>
  );
}
