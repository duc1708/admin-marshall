import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import '../assets/styles/dashboard.css';
const Dashboard = () => {
    const[categorys, setCategorys] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL_ADMIN}categorys`)
          .then(response => {
            setCategorys(response.data);
          })
          .catch(error => {
            console.error('Có lỗi khi gọi API:', error);
          });
      }, []);
    return (
        <div className='dashboard'>
            <div className='list-categorys'>
            <h6>Hi, Welcome Back</h6>
                <img src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733997138/Screenshot_2024-12-12_164809_vcuhmi.jpg'} alt='err'/>
                <Row>
                    {categorys.map(category => (
                        <Col sm={3}>
                            <div className="category-item">
                                <img src={category.img} alt={category.tenLoai} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;