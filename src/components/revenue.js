import React, { useEffect, useState } from "react";
import ChartComponent from "./chart";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ChartProducts from './chartproducts';
import ChartTime from './chartTime';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Revenue = () => {
  const [stats, setStats] = useState({
    salesToday: 0,
    salesThisWeek: 0,
    salesThisMonth: 0,
    salesThisYear: 0,
  });

  const fetchData = async () => {
    try {
      // Gọi API lấy dữ liệu
      const response = await fetch("http://localhost:4001/api/revenue");
      const data = await response.json();

      // Ngày hiện tại
      const today = new Date();

      // Hàm hỗ trợ định dạng ngày
      const getStartOfDay = (date) =>
        new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const getStartOfWeek = (date) => {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.getFullYear(), date.getMonth(), diff);
      };
      // const getStartOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
      // const getStartOfYear = (date) => new Date(date.getFullYear(), 0, 1);

      // Tính thống kê
      const salesToday = data
        .filter((item) => {
          const saleDate = getStartOfDay(new Date(item.ngayBan));
          return saleDate.getTime() === getStartOfDay(today).getTime();
        })
        .reduce((sum, item) => sum + item.tongTien, 0);

      const salesThisWeek = data
        .filter((item) => {
          const saleDate = getStartOfDay(new Date(item.ngayBan));
          return saleDate >= getStartOfWeek(today) && saleDate <= today;
        })
        .reduce((sum, item) => sum + item.tongTien, 0);

      const salesThisMonth = data
        .filter((item) => {
          const saleDate = new Date(item.ngayBan);
          return (
            saleDate.getFullYear() === today.getFullYear() &&
            saleDate.getMonth() === today.getMonth()
          );
        })
        .reduce((sum, item) => sum + item.tongTien, 0);

      const salesThisYear = data
        .filter((item) => {
          const saleDate = new Date(item.ngayBan);
          return saleDate.getFullYear() === today.getFullYear();
        })
        .reduce((sum, item) => sum + item.tongTien, 0);

      // Cập nhật state thống kê
      setStats({
        salesToday,
        salesThisWeek,
        salesThisMonth,
        salesThisYear,
      });
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Thống kê theo số liệu" {...a11yProps(0)} />
          <Tab label="Thống kê theo sản phẩm" {...a11yProps(1)} />
          <Tab label="Thống kê theo thời gian" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ChartComponent stats={stats} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChartProducts/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ChartTime/>
      </CustomTabPanel>
    </Box>
    </div>
  );
};

export default Revenue;
