import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IoMdKey } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import '../assets/styles/login.css';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL_ADMIN}admin`);
      const accounts = response.data;

      const validAccount = accounts.find(
        (account) => account.tenTK === username && account.matKhau === password
      );

      if (validAccount) {
        localStorage.setItem('hoTen', validAccount.hoTen)
        localStorage.setItem('avt', validAccount.avt)
        localStorage.setItem('gmail', validAccount.gmail)
        localStorage.setItem('vaiTro', validAccount.vaiTro)
        setError(null);
        navigate('/admin'); // Navigate to homepage
      } else {
        setError('Sai tên tài khoản hoặc mật khẩu');
      }
    } catch (error) {
      setError('Đã xảy ra lỗi, vui lòng thử lại');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login_about">
      <div className="login_content">
        <img
          className="img_login"
          src="https://res.cloudinary.com/deuqzffc4/image/upload/v1733303460/background_login_pyt80x.jpg"
          alt="login"
        />
        <div className="form_login">
          <div className="user">
            <FaUser />
            <input 
              type="text" 
              placeholder="Tên người dùng" 
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
          <div className="pass">
            <IoMdKey />
            <input 
              type="password" 
              placeholder="Mật khẩu" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}


export default Login;
