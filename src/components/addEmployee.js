import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/user.css';

function AddEmployee() {
  const [hoTen, setHoTen] = useState('');
  const [gmail, setGmail] = useState('');
  const [sdt, setSdt] = useState('');
  const [vaiTro, setVaiTro] = useState('');
  const [gioiTinh, setGioiTinh] = useState('Nam');
  const [tenTK, setTenTK] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [avt, setAvt] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Thêm state để kiểm tra thành công

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      tenTK,
      matKhau,
      hoTen,
      gmail,
      sdt,
      gioiTinh,
      avt,
      vaiTro,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL_ADMIN}employees`, newEmployee)
      .then((response) => {
        alert('Thêm nhân viên thành công!');
        setIsSuccess(true); // Đặt thành true khi thêm thành công
      })
      .catch((error) => {
        console.error('Có lỗi khi thêm nhân viên:', error);
        alert('Thêm nhân viên không thành công. Vui lòng thử lại!');
      });
  };

  return (
    <div>
      {!isSuccess && ( // Kiểm tra và chỉ hiển thị form nếu isSuccess là false
        <form className='addEmployee' onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Tên tài khoản:</label>
            <input
              type="text"
              value={tenTK}
              onChange={(e) => setTenTK(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Mật khẩu:</label>
            <input
              type="pass"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Họ tên:</label>
            <input
              type="text"
              value={hoTen}
              onChange={(e) => setHoTen(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Email:</label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Số điện thoại:</label>
            <input
              type="text"
              value={sdt}
              onChange={(e) => setSdt(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Giới tính:</label>
            <select
              value={gioiTinh}
              onChange={(e) => setGioiTinh(e.target.value)}
            >
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Hình ảnh đại diện (URL):</label>
            <input
              type="text"
              value={avt}
              onChange={(e) => setAvt(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Vai trò</label>
            <input
              type="text"
              value={vaiTro}
              onChange={(e) => setVaiTro(e.target.value)}
            />
          </div>
          <button type="submit">Thêm nhân viên</button>
        </form>
      )}
    </div>
  );
}

export default AddEmployee;
