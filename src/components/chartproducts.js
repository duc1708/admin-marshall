import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const RevenueStatistics = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [viewType, setViewType] = useState('bar'); // 'bar' or 'pie'

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#D0ED57', '#A28CFE'];

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_ADMIN}revenue`);
        setRevenueData(response.data);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData();
  }, []); // This effect only runs once when the component mounts

  // Call handleChartData whenever revenueData or chartType changes
  useEffect(() => {
    handleChartData(chartType);
  }, [revenueData, chartType]);

  const handleChartTypeChange = (type) => {
    setChartType(type); // Set the chart type, which will trigger the effect to update chartData
  };

  const handleChartData = (type) => {
    let filteredData = [];

    if (type === 'daily') {
      filteredData = revenueData.filter(
        (item) => new Date(item.ngayBan).toDateString() === new Date().toDateString()
      );
    } else if (type === 'weekly') {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 6);

      filteredData = revenueData.filter((item) => {
        const itemDate = new Date(item.ngayBan);
        return itemDate >= sevenDaysAgo && itemDate <= today;
      });
    } else if (type === 'monthly') {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      filteredData = revenueData.filter((item) => {
        const itemDate = new Date(item.ngayBan);
        return (
          itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear
        );
      });
    } else if (type === 'yearly') {
      const currentYear = new Date().getFullYear();

      filteredData = revenueData.filter((item) => {
        const itemDate = new Date(item.ngayBan);
        return itemDate.getFullYear() === currentYear;
      });
    }

    const chartData = calculateRevenueStatistics(filteredData);
    setChartData(chartData);
  };

  const calculateRevenueStatistics = (data) => {
    const statistics = {};
    data.forEach((item) => {
      if (statistics[item.maSP]) {
        statistics[item.maSP].soLuong += item.soLuong;
        statistics[item.maSP].tongTien += item.tongTien;
      } else {
        statistics[item.maSP] = {
          soLuong: item.soLuong,
          tongTien: item.tongTien,
          tenSp: item.tenSp,
        };
      }
    });
    return Object.entries(statistics).map(([maSP, { soLuong, tongTien, tenSp }]) => ({
      maSP,
      soLuong,
      tongTien,
      tenSp,
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { tenSp, soLuong, tongTien } = payload[0].payload || {};
      return (
        <div
          style={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <p>{`Tên sản phẩm: ${tenSp || 'N/A'}`}</p>
          <p>{`Số lượng: ${soLuong || 0}`}</p>
          <p>{`Tổng tiền thu được: ${tongTien.toLocaleString()} VND`}</p>
        </div>
      );
    }
    return null;
  };

  const buttonStyle = {
    margin: '0 10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#0056b3',
  };

  return (
    <div>
      <h1>Thống kê doanh thu</h1>
      <div>
        <button
          style={chartType === 'daily' ? activeButtonStyle : buttonStyle}
          onClick={() => handleChartTypeChange('daily')}
        >
          Ngày
        </button>
        <button
          style={chartType === 'weekly' ? activeButtonStyle : buttonStyle}
          onClick={() => handleChartTypeChange('weekly')}
        >
          Tuần
        </button>
        <button
          style={chartType === 'monthly' ? activeButtonStyle : buttonStyle}
          onClick={() => handleChartTypeChange('monthly')}
        >
          Tháng
        </button>
        <button
          style={chartType === 'yearly' ? activeButtonStyle : buttonStyle}
          onClick={() => handleChartTypeChange('yearly')}
        >
          Năm
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          style={viewType === 'bar' ? activeButtonStyle : buttonStyle}
          onClick={() => setViewType('bar')}
        >
          Biểu đồ cột
        </button>
        <button
          style={viewType === 'pie' ? activeButtonStyle : buttonStyle}
          onClick={() => setViewType('pie')}
        >
          Biểu đồ tròn
        </button>
      </div>

      {viewType === 'bar' && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="soLuong" fill="#8884d8" name="Số lượng" />
            <Bar dataKey="tongTien" fill="#82ca9d" name="Tổng tiền" />
          </BarChart>
        </ResponsiveContainer>
      )}

      {viewType === 'pie' && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="tongTien"
              nameKey="tenSp"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default RevenueStatistics;
