import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../assets/styles/user.css';
import axios from 'axios';
import AddEmployee from '../components/addEmployee';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

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

export default function Accounts() {
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = React.useState([]);
  const [admins, setAdmins] = React.useState([]);
  const [isAdding, setIsAdding] = React.useState(false); // Control the display of the Add Employee form
  const [selectedEmployee, setSelectedEmployee] = React.useState(null); // State for the selected employee to edit
  const role = localStorage.getItem('vaiTro'); // Get role from localStorage
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [tenKh, setTenKh] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user ID
  const handleClose = () => setShow(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleShowCart = (userId) => {
    setSelectedUser(userId); // Set the selected user's ID
    axios
      .get(`${process.env.REACT_APP_API_URL_ADMIN}products/order/${userId}`)
      .then((response) => {
        setCartItems(response.data); // Store cart items in state
        setShow(true); // Show modal
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        alert('Không thể lấy dữ liệu giỏ hàng!');
      });
    axios.get(`${process.env.REACT_APP_API_URL_ADMIN}tenKh/${userId}`)
      .then((respone)=>{
        setTenKh(respone.data)
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        alert('Không thể lấy dữ liệu giỏ hàng!');
      });
  };

  const toggleAddEmployee = () => {
    if (role !== 'Admin') {
      alert('Bạn không đủ quyền để thêm nhân viên');
      return;
    } else {
      setIsAdding(!isAdding);
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL_ADMIN}accounts`)
      .then(response => {
        setUsers(response.data);  
      })
      .catch(error => {
        console.error('Có lỗi khi gọi API:', error);
      });

    axios.get(`${process.env.REACT_APP_API_URL_ADMIN}admin`)
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('Có lỗi khi gọi API:', error);
      });
  }, []);

  const deleteUser = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL_ADMIN}accounts/${id}`)
        .then(() => {
          setUsers(users.filter((user) => user.id !== id));
        })
        .catch((error) => {
          console.error("Có lỗi khi xóa người dùng:", error);
          alert("Xóa không thành công, vui lòng thử lại!");
        });
    }
  };

  const deleteEmployee = (id) => {
    if (role !== 'Admin') {
      alert('Bạn không đủ quyền để xóa người dùng này!');
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này không?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL_ADMIN}employees/${id}`)
        .then(() => {
          setAdmins(admins.filter((admin) => admin.id !== id));
        })
        .catch((error) => {
          console.error("Có lỗi khi xóa nhân viên:", error);
          alert("Xóa không thành công, vui lòng thử lại!");
        });
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee); // Update selected employee data when clicking edit
  };

  const handleUpdateEmployee = () => {
    if (selectedEmployee) {
      axios.put(`${process.env.REACT_APP_API_URL_ADMIN}admin/${selectedEmployee.id}`, selectedEmployee)
        .then(response => {
          alert('Cập nhật thành công!');
          setSelectedEmployee(null); // Reset after update
        })
        .catch(error => {
          console.error('Có lỗi khi cập nhật nhân viên:', error);
          alert('Cập nhật không thành công!');
        });
    }
  };

  const handleUpdateStatus = (id,trangThai) => {
    let newStatus = '';
    if (trangThai === 'Đang xử lý') {
      newStatus = 'Đã nhận';
    } else if (trangThai === 'Đã nhận') {
      newStatus = 'Đang giao';
    } else {
      // Trạng thái là 'Đang giao', thực hiện xóa item
      axios.delete(`${process.env.REACT_APP_API_URL_ADMIN}products/order/${id}`)
        .then(() => {
          setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
        })
        .catch((error) => {
          console.error("Có lỗi khi xóa sản phẩm:", error);
          alert("Xóa không thành công, vui lòng thử lại!");
        });
      return;
    }
  
    // Gửi yêu cầu cập nhật trạng thái lên server
    axios.put(`${process.env.REACT_APP_API_URL_ADMIN}products/order/${id}`, { trangThai: newStatus })
      .then(() => {
        // Cập nhật trạng thái trong state
        setCartItems(cartItems.map((cartItem) => cartItem.id === id ? { ...cartItem, trangThai: newStatus } : cartItem));
        alert('Cập nhật thành công')
      })
      .catch((error) => {
        console.error("Có lỗi khi cập nhật trạng thái:", error);
        alert("Cập nhật trạng thái không thành công!");
      });
  };

  const [searchKeyword, setSearchKeyword] = useState('');

// Logic tìm kiếm và hiển thị user phù hợp
  const filteredUsers = users.filter(user =>
    user.tenKh.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const [searchAdminKeyword, setSearchAdminKeyword] = useState('');

  // Logic tìm kiếm và hiển thị admin phù hợp
  const filteredAdmins = admins.filter(admin =>
    admin.hoTen.toLowerCase().includes(searchAdminKeyword.toLowerCase())
  );
  return (
    <div className='account'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tài khoản khách hàng" {...a11yProps(0)} />
            <Tab label="Tài khoản nhân viên" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{tenKh.map((item, index) => (
            <div>
                <p>Giỏ hàng của {item.tenKh}</p>
            </div>
            ))}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col sm={8}>
                            {cartItems.length === 0 ? (
                            <p>No items in the cart.</p>
                            ) : (   
                            <div>
                                <div style={{marginLeft: '114px', marginTop:'20px'}} className='inline-flex'>
                                    <h6 style={{width: '200px'}}>Sản phẩm</h6>
                                    <h6 style={{width: '200px'}}>Giá</h6>
                                    <h6 style={{width: '200px'}}>Số lượng</h6>
                                    <h6 style={{width: '200px'}}>Tổng tiền</h6>
                                    <h6 style={{width: '200px'}}>Trạng thái</h6>
                                </div>
                                {cartItems.map((item, index) => (
                                    <div>
                                        <div class='infor-cart inline-flex'>
                                            <img
                                                src={item.anhDD || 'placeholder-image-url.jpg'}
                                                alt={item.tenSp || 'No Name'}
                                                style={{ width: '80px', height: 'auto' }}
                                            />
                                            <h6 style={{width: '200px', marginTop: '30px'}}>{item.tenSp}</h6>
                                            <p style={{fontSize:'13px', width: '200px', marginTop: '30px', marginLeft:'26px'}}>{item.giaTien?.toLocaleString() || '0'} ₫</p>
                                            <div style={{width: '175px', marginTop: '30px', marginLeft:'38px'}} className=' quantity inline-flex' >
                                                <span>{item.soLuong || 0}</span>
                                            </div>
                                            <p style={{fontSize:'13px',width: '200px', marginTop: '30px'}}>{(item.giaTien * item.soLuong)?.toLocaleString() || '0'} ₫</p>
                                            <button onClick={() => handleUpdateStatus(item.id, item.trangThai)} style={{marginTop:'20px', marginRight:'-20px',height:'30px', border:'none', background:'#075807', width:'100px', color:'#fff', fontSize:'13px', fontWeight:'500'}}>
                                                {item.trangThai === 'Đang xử lý' ? 'Đã nhận' : item.trangThai === 'Đã nhận' ? 'Đang giao' : 'Giao thành công'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
        <CustomTabPanel value={value} index={0}>
        <input 
          placeholder='Search user' 
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        /><br/>
          <div className='properties-user inline-flex'>
            <p style={{ width: '200px' }}>Name</p>
            <p style={{ width: '150px' }}>Gmail</p>
            <p style={{ width: '150px' }}>Số điện thoại</p>
            <p style={{ width: '100px' }}>Trạng thái</p>
            <p style={{ width: '100px' }}>Giới tính</p>
          </div>
          <div>
          {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
              <div key={user.id} className='inline-flex' style={{ marginTop: '20px' }}>
                <img 
                  style={{ width: '4%', marginRight: '10px', marginTop: '25px', cursor: 'pointer', height: '20px' }} 
                  src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733823480/garbage_vs4yvh.png'} 
                  alt='err' 
                  onClick={() => deleteUser(user.id)} // Delete user
                />
                <div style={{ marginTop: '10px', width: '200px' }} className='inline-flex'>
                  <img onClick={() => handleShowCart(user.id)} style={{cursor:'pointer', width: '50px', height: '50px', marginRight: '10px' }} src={`/avatar_user/${user.avt}`} alt='err' />
                  <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '15px' }}>{user.tenKh}</p>
                </div>
                <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '25px', marginLeft: '35px', width: '150px' }}>{user.gmail}</p>
                <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '25px', marginLeft: '35px', width: '150px' }}>{user.sdt}</p>
                <div style={{ width: '100px', marginLeft: '35px' }}>
                  <img style={{ width: '30%', marginLeft: '16px', marginTop: '20px', cursor: 'pointer', height: '27px' }} src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733826533/active-user_xzryul.png'} alt='err' />
                </div>
                <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '25px', marginLeft: '40px', width: '100px' }}>{user.gioiTinh}</p>
              </div>
            ))}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <input 
  placeholder='Search admin' 
  value={searchAdminKeyword}
  onChange={(e) => setSearchAdminKeyword(e.target.value)}
/>
          <button className='update-employee' onClick={() => window.location.reload()}>
            Cập nhật
          </button>
          <button className='add-employee' onClick={toggleAddEmployee}>
            Thêm nhân viên
          </button>
          {selectedEmployee && (
            <div className='edit-employee-form'>
              <label>Name:</label>
              <input 
                type='text' 
                value={selectedEmployee.hoTen} 
                onChange={(e) => setSelectedEmployee({...selectedEmployee, hoTen: e.target.value})}
              />
              <label>Gmail:</label>
              <input 
                type='email' 
                value={selectedEmployee.gmail} 
                onChange={(e) => setSelectedEmployee({...selectedEmployee, gmail: e.target.value})}
              />
              <label>Phone:</label>
              <input 
                type='text' 
                value={selectedEmployee.sdt} 
                onChange={(e) => setSelectedEmployee({...selectedEmployee, sdt: e.target.value})}
              />
              <label>Gender:</label>
              <select
                value={selectedEmployee.gioiTinh}
                onChange={(e) => setSelectedEmployee({...selectedEmployee, gioiTinh: e.target.value})}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select><br/>
              <label>Avatar:</label>
              <input 
                type='text' 
                value={selectedEmployee.avt} 
                onChange={(e) => setSelectedEmployee({...selectedEmployee, avt: e.target.value})}
              />
              <button onClick={handleUpdateEmployee}>Save Changes</button>
            </div>
          )}

          {/* Show Add Employee form if isAdding is true */}
          {isAdding && <AddEmployee />}
          <div className='properties-user inline-flex'>
            <p style={{ width: '200px' }}>Name</p>
            <p style={{ width: '150px' }}>Gmail</p>
            <p style={{ width: '150px' }}>Số điện thoại</p>
            <p style={{ width: '100px' }}>Chức vụ</p>
            <p style={{ width: '100px' }}>Giới tính</p>
          </div>
          <div>
          {Array.isArray(filteredAdmins) && filteredAdmins.map((admin) => (
              <div key={admin.id} className='inline-flex' style={{ marginTop: '20px' }}>
                <img 
                  style={{ width: '4%', marginRight: '10px', marginTop: '25px', cursor: 'pointer', height: '20px' }} 
                  src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733823480/garbage_vs4yvh.png'} 
                  alt='err' 
                  onClick={() => deleteEmployee(admin.id)} 
                />
                <div style={{ marginTop: '10px', width: '200px' }} className='inline-flex'>
                  <img style={{ width: '50px', height: '50px', marginRight: '10px' }} src={admin.avt} alt='err' />
                  <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '15px' }}>{admin.hoTen}</p>
                </div>
                <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '25px', marginLeft: '35px', width: '150px' }}>{admin.gmail}</p>
                <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '25px', marginLeft: '70px', width: '140px' }}>{admin.sdt}</p>
                <div style={{ width: '200px', display:'inline-flex' }}>
                  <img 
                      style={{ width: '20%', marginLeft: '16px',marginRight:'20px', marginTop: '20px', cursor: 'pointer', height: '27px' }} 
                      src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733826533/active-user_xzryul.png'} 

                      alt='edit' 
                    />
                    <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop:'20px'}}>{admin.vaiTro}</p>
                </div>
                <p style={{ fontSize: '13px', color: '#637381', fontWeight: '500', marginTop: '25px', width: '100px' }}>{admin.gioiTinh}</p>
                <img 
                    style={{ width: '4%', marginTop: '20px', cursor: 'pointer', height: '27px' }} 
                    src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733898158/modification_qaw1mr.png'} 
                    alt='edit' 
                    onClick={() => handleEditClick(admin)} // Enable edit for the selected employee
                  />
              </div>
            ))}
            
          </div>
          
        </CustomTabPanel>
      </Box>
    </div>
  );
}

