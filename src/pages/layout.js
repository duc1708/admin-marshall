import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../assets/styles/index.css';
import '../assets/styles/layout.css';
import { FcHome } from "react-icons/fc";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { FcConferenceCall } from "react-icons/fc";
import { HiShoppingCart } from "react-icons/hi";
import { FaBlogger } from "react-icons/fa";
import { FcBearish } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { FcRating } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import Dashboard from '../components/dashboard.js';
import User from '../components/accounts.js';
import Products from '../components/products.js';
import Blogs from '../components/blog.js';
import { useNavigate } from 'react-router-dom';
import Revenue from '../components/revenue.js';
const Layout = () => {
    const avt = localStorage.getItem('avt');
    const navigate = useNavigate();
    const handleLogout = () =>{
        navigate('/')
    }

    return (
        <div className='layout'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className='wrapper'>
                    <Row style={{width:'100%'}}>
                        <Col sm={3}>
                            <div className='left-layout'>
                                <img style={{width:'30%'}} src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733809616/5ccef75166b3eadad57f514cc37de80d_jjz5kp.jpg'} alt='err'/><br/>
                                <div className='team inline-flex'>
                                    <img style={{width:'10%', height:'24px'}} src = {'https://res.cloudinary.com/deuqzffc4/image/upload/v1733809914/logo-1_qqjinx.webp'}  alt='err' />
                                <p style={{fontSize:'12px', fontWeight:'600', margin:'5px 0px 0px 5px'}}>Team Employee</p>
                                </div>
                                <div className='option-manager'>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link style={{width:'100%', height:'40px', marginBottom:'10px'}} className='inline-flex' eventKey="first">
                                                    <FcHome/>
                                                    <p style={{fontSize:'14px' , marginLeft:'20px', fontWeight:'500',opacity:'0.8', color:'#637381'}}>Dashboard</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link style={{width:'100%', height:'40px', marginBottom:'10px'}} className='inline-flex' eventKey="user">
                                                    <FcConferenceCall/>
                                                    <p style={{fontSize:'14px' , marginLeft:'20px', fontWeight:'500',opacity:'0.8', color:'#637381'}}>Tài khoản</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link style={{width:'100%', height:'40px', marginBottom:'10px'}} className='inline-flex' eventKey="products">
                                                    <HiShoppingCart/>
                                                    <p style={{fontSize:'14px' , marginLeft:'20px', fontWeight:'500',opacity:'0.8', color:'#637381'}}>Sản phẩm</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link style={{width:'100%', height:'40px', marginBottom:'10px'}} className='inline-flex' eventKey="blogs">
                                                    <FaBlogger/>
                                                    <p style={{fontSize:'14px' , marginLeft:'20px', fontWeight:'500',opacity:'0.8', color:'#637381'}}>Bài viết</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link style={{width:'100%', height:'40px', marginBottom:'10px'}} className='inline-flex' eventKey="revenue">
                                                    <FcBearish/>
                                                    <p style={{fontSize:'14px' , marginLeft:'20px', fontWeight:'500',opacity:'0.8', color:'#637381'}}>Doanh thu</p>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                </div>
                            </div>
                            <img style={{marginLeft:'40px'}} src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733829352/52cfae37d0e9a7a57fe494d0099899ad_fqh54w.jpg'} alt='err'/>
                        </Col>
                        <Col style={{background:'#f9fafb'}} sm={9}>
                            <div className='right-layout'>
                                <div className='header'>
                                    <div style={{position:'relative', left:'700px', width:'250px'}}>
                                        <FcSearch/>
                                        <FcRating/>
                                        <FcAdvertising/>
                                        <img 
                                            className='avt' 
                                            src={avt} 
                                            alt='err' 
                                        />
                                        <button style={{border:'none', background:'#000', color:'#fff', fontSize:'13px', fontWeight:'500', padding:'5px 5px 5px 5px'}} onClick={handleLogout}>Logout</button>

                                    </div>
                                </div>
                                <div className='content'>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first"><Dashboard/></Tab.Pane>
                                        <Tab.Pane eventKey="user"><User/></Tab.Pane>
                                        <Tab.Pane eventKey="products"><Products/></Tab.Pane>
                                        <Tab.Pane eventKey="blogs"><Blogs/></Tab.Pane>
                                        <Tab.Pane eventKey="revenue"><Revenue/></Tab.Pane>
                                        {/* <Tab.Pane eventKey="Profile">Fifth tab content</Tab.Pane> */}
                                    </Tab.Content>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Tab.Container>
        </div>
    );
};

export default Layout;