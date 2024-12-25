const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Kết nối MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // user của MySQL
    password: '', // mật khẩu của MySQL
    database: 'ecom-marshall' // tên database
})


// Lấy tài khoản của khách hàng
app.get('/api/accounts',(req,res)=>{
    const sql = 'SELECT * FROM khachhang';
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        res.json(result);
    })
})

// xóa tài khoản user
app.delete('/api/accounts/:id', (req, res) => {
    const userId = req.params.id;
  
    // Thực hiện truy vấn xóa người dùng
    const query = 'DELETE FROM khachhang WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa người dùng' });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Người dùng đã được xóa thành công' });
      } else {
        return res.status(404).json({ message: 'Không tìm thấy người dùng để xóa' });
      }
    });
});


// Get tài khoản admin
app.get('/api/admin',(req,res)=>{
    const sql = 'SELECT * FROM admin';
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({error:err});
        }
        res.json(result);
    })
})


app.delete('/api/employees/:id', (req, res) => {
    const adminId = req.params.id;
  
    // Thực hiện truy vấn xóa người dùng
    const query = 'DELETE FROM admin WHERE id = ?';
    db.query(query, [adminId], (err, result) => {
      if (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa người dùng' });
      }
  
      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Người dùng đã được xóa thành công' });
      } else {
        return res.status(404).json({ message: 'Không tìm thấy người dùng để xóa' });
      }
    });
});


app.post('/api/employees', (req, res) => {
    const { tenTK, matKhau, hoTen, gmail, sdt, gioiTinh,avt, vaiTro } = req.body;
  
    // Kiểm tra nếu thiếu thông tin
    if (!tenTK || !matKhau || !hoTen || !gmail || !sdt || !gioiTinh || !avt || !vaiTro) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin.' });
    }
  
    // Thêm nhân viên vào cơ sở dữ liệu
    const query = 'INSERT INTO admin (tenTK, matKhau, hoTen, gmail, sdt, gioiTinh, avt , vaiTro) VALUES (?, ?, ?, ?, ?, ?,?, ?)';
    db.query(query, [tenTK, matKhau, hoTen, gmail, sdt, gioiTinh, avt, vaiTro], (err, result) => {
      if (err) {
        console.error('Lỗi khi thêm nhân viên:', err);
        return res.status(500).json({ message: 'Có lỗi khi thêm nhân viên. Vui lòng thử lại!' });
      }
      res.status(201).json({ message: 'Thêm nhân viên thành công!', id: result.insertId });
    });
  });

// Chỉnh sửa tài khoản nhân viên
app.put('/api/admin/:id', (req, res) => {
    const { id } = req.params;
    const { hoTen, gmail, sdt, gioiTinh, avt } = req.body;
    const query = 'UPDATE admin SET hoTen = ?, gmail = ?, sdt = ?, gioiTinh = ?, avt = ? WHERE id = ?';
    db.query(query, [hoTen, gmail, sdt, gioiTinh, avt, id], (err, result) => {
      if (err) {
        console.error('Có lỗi khi cập nhật nhân viên:', err);
        res.status(500).send('Lỗi server');
      } else {
        res.send('Cập nhật nhân viên thành công');
      }
    });
});

// Lấy tất cả các loại sản phẩm
app.get('/api/categorys', (req,res)=>{
  const sql = 'SELECT * FROM loaisp';
  db.query(sql, (err,result)=>{
      if(err){
          return res.status(500).json({error: err});
      }
      res.json(result);
  })
})

// Lấy sản phẩm theo mã loại
app.get('/api/products/:category', (req, res) => {
    const category = req.params.category;

    const query = `SELECT * FROM sanpham WHERE maLoai = ?`;

    db.query(query, [category], (err, results) => {
        if (err) {
            console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
            return res.status(500).json({ message: 'Có lỗi khi lấy sản phẩm' });
        }
        res.json(results); // Trả về danh sách sản phẩm
    });
});

// API lấy ra các blog

app.get('/api/blogs', (req,res)=>{
    const sql = 'SELECT * FROM baiviet';
    db.query(sql, (err,result)=>{
        if(err){
            return res.status(500).json({error: err});
        }
        res.json(result);
    })
})

// Chỉnh sửa bài viết
app.put('/api/blogs/:id', (req, res) => {
    const { id } = req.params;
    const { tenbaiviet, img, noiDung } = req.body;
    console.log(noiDung);
    const query = 'UPDATE baiviet SET tenbaiviet = ?, img = ?, noiDung = ? WHERE id = ?';
    db.query(query, [tenbaiviet, img, noiDung, id], (err, result) => {
      if (err) {
        console.error('Lỗi cập nhật bài viết:', err);
        res.status(500).send('Lỗi server');
      } else {
        res.send('Cập nhật bài viết thành công');
      }
    });
  });

  // Delete bài viết
  app.delete('/api/blogs/:id', (req, res) => {
    const blogId = req.params.id;
  
    const deleteQuery = 'DELETE FROM baiviet WHERE id = ?';
    db.query(deleteQuery, [blogId], (err, result) => {
      if (err) {
        console.error('Error deleting blog post:', err);
        return res.status(500).json({ message: 'Failed to delete blog post' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      res.status(200).json({ message: 'Blog post deleted successfully' });
    });
  });

// Post bài viết
app.post('/api/blogs', (req, res) => {
    const { tenbaiviet, img, noiDung } = req.body;
  
    if (!tenbaiviet || !img || !noiDung) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
  
  const sql = 'INSERT INTO baiviet (tenbaiviet, img, noiDung) VALUES (?, ?, ?)';
    db.query(sql, [tenbaiviet, img, noiDung], (err, result) => {
      if (err) {
        console.error('Error inserting blog:', err);
        return res.status(500).json({ message: 'Error inserting blog' });
      }
      res.status(201).json({ message: 'Blog added successfully', blogId: result.insertId });
  });
});
  

// Lấy thông số kỹ thuật cho loại âm thanh
app.get('/api/thong-so-ky-thuat', (req,res)=>{
    const sql = 'SELECT * FROM thongso_kythuat';
    db.query(sql, (err,result)=>{
        if(err){
            return res.status(500).json({error: err});
        }
        res.json(result);
    })
})

app.get('/api/revenue', (req, res) => {
  const query = 'SELECT * FROM thongkedoanhthu';
  db.query(query, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});


app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { tenSp, maLoai, noiDung, giaBan, anhDD, anhDD1, anhDD2, thuongHieu, maKm, 
    phanTram, trangThai, anhmota1, anhmota2, anhmota3, anhmota4, anhmota5, anhmota6,
    amthanh, thietke, thoiLuong, tuyChinh, sao, mau, ungDung, loaiKetNoi, pin, thoiLuongPin,
    kichThuoc, thoiGianSac
  } = req.body;

  const productQuery = `
      UPDATE sanpham 
      SET tenSp = ?, maLoai = ?, noiDung = ?, giaBan = ?, anhDD = ?, anhDD1 = ?, anhDD2 = ?, thuongHieu = ?, maKm = ?, 
          phanTram = ?, trangThai = ?, anhmota1 = ?, anhmota2 = ?, anhmota3 = ?, anhmota4 = ?, anhmota5 = ?, anhmota6 = ?, 
          amthanh = ?, thietke = ?, thoiLuong = ?, tuyChinh = ?, sao = ? 
      WHERE maSP = ?
  `;

  const productValues = [tenSp, maLoai, noiDung, giaBan, anhDD, anhDD1, anhDD2, thuongHieu, maKm, 
    phanTram, trangThai, anhmota1, anhmota2, anhmota3, anhmota4, anhmota5, anhmota6, 
    amthanh, thietke, thoiLuong, tuyChinh, sao, productId
  ];

  db.query(productQuery, productValues, (err, result) => {
      if (err) {
          console.error("Error updating product:", err);
          return res.status(500).json({ message: 'Error updating product' });
      }

      const specsQuery = `
          UPDATE thongso_kythuat
          SET thuongHieu = ?, mau = ?, ungDung = ?, loaiKetNoi = ?, pin = ?, thoiLuongPin = ?, thoiGianSac = ?, kichThuoc = ?
          WHERE maSP = ?
      `;

      const specsValues = [thuongHieu, mau, ungDung, loaiKetNoi, pin, thoiLuongPin, thoiGianSac, kichThuoc, productId];

      db.query(specsQuery, specsValues, (err, result) => {
          if (err) {
              console.error("Error updating product specs:", err);
              return res.status(500).json({ message: 'Error updating product specs' });
          }
          res.status(200).json({ message: 'Product and specs updated successfully' });
      });
  });
});


app.post('/api/products', (req, res) => {
  const {
      tenSp, maLoai, noiDung, giaBan, anhDD, anhDD1, anhDD2, thuongHieu, maKm,
      phanTram, trangThai, anhmota1, anhmota2, anhmota3, anhmota4, anhmota5, anhmota6,
      amthanh, thietke, thoiLuong, tuyChinh, sao, mau, ungDung, loaiKetNoi, pin, thoiLuongPin,
      kichThuoc, thoiGianSac
  } = req.body;

  const productQuery = `
      INSERT INTO sanpham (
          tenSp, maLoai, noiDung, giaBan, anhDD, anhDD1, anhDD2, thuongHieu, maKm,
          phanTram, trangThai, anhmota1, anhmota2, anhmota3, anhmota4, anhmota5, anhmota6,
          amthanh, thietke, thoiLuong, tuyChinh, sao
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const productValues = [
      tenSp, maLoai, noiDung, giaBan, anhDD, anhDD1, anhDD2, thuongHieu, maKm,
      phanTram, trangThai, anhmota1, anhmota2, anhmota3, anhmota4, anhmota5, anhmota6,
      amthanh, thietke, thoiLuong, tuyChinh, sao
  ];

  db.query(productQuery, productValues, (err, result) => {
      if (err) {
          console.error("Error adding product:", err);
          return res.status(500).json({ message: 'Error adding product' });
      }

      const newProductId = result.insertId;

      const specsQuery = `
          INSERT INTO thongso_kythuat (
              maSP, thuongHieu, mau, ungDung, loaiKetNoi, pin, thoiLuongPin, thoiGianSac, kichThuoc
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const specsValues = [
          newProductId, thuongHieu, mau, ungDung, loaiKetNoi, pin, thoiLuongPin, thoiGianSac, kichThuoc
      ];

      db.query(specsQuery, specsValues, (err, result) => {
          if (err) {
              console.error("Error adding product specs:", err);
              return res.status(500).json({ message: 'Error adding product specs' });
          }

          res.status(201).json({ message: 'Product and specs added successfully' });
      });
  });
});


app.get('/api/tenKh/:maKh', (req,res)=>{
  const maKh =  req.params.maKh
  const query = `
  SELECT tenKh
  FROM khachhang kh
  WHERE id = ?
`;

  db.query(query, [maKh], (err, results) => {
    if (err) {
        console.error('Error fetching cart data:', err);
        return res.status(500).send('Server error');
    }
    res.json(results); // Trả về dữ liệu giỏ hàng dưới dạng JSON
  });

})

app.get('/api/products/order/:maKh', (req, res) => {
  const maKh = req.params.maKh; // Lấy maKh từ URL

  // Query SQL để lấy giỏ hàng của khách hàng từ bảng giỏ hàng
  const query = `
      SELECT dm.id, dm.maKh, dm.maSP, sp.tenSp, sp.anhDD, dm.soLuong, dm.giaTien, dm.trangThai, dm.sdt
      FROM donhang_damua dm
      JOIN sanpham sp ON dm.maSP = sp.maSP
      WHERE dm.maKh = ?
  `;
  
  db.query(query, [maKh], (err, results) => {
      if (err) {
          console.error('Error fetching cart data:', err);
          return res.status(500).send('Server error');
      }
      res.json(results); // Trả về dữ liệu giỏ hàng dưới dạng JSON
  });
});


// Route để xử lý cập nhật trạng thái sản phẩm
app.put('/api/products/order/:id', (req, res) => {
  const { id } = req.params; // ID của đơn hàng từ URL
  const { trangThai } = req.body; // Trạng thái mới từ body request

  if (!trangThai) {
    return res.status(400).json({ message: 'Trạng thái không được để trống!' });
  }

  // Kiểm tra xem đơn hàng có tồn tại không
  db.query('SELECT * FROM donhang_damua WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Lỗi khi kiểm tra đơn hàng:', err);
      return res.status(500).json({ message: 'Đã xảy ra lỗi khi kiểm tra đơn hàng!' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại!' });
    }

    // Cập nhật trạng thái đơn hàng
    db.query(
      'UPDATE donhang_damua SET trangThai = ? WHERE id = ?',
      [trangThai, id],
      (err) => {
        if (err) {
          console.error('Lỗi khi cập nhật trạng thái:', err);
          return res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái!' });
        }

        res.status(200).json({ message: 'Cập nhật trạng thái thành công!' });
      }
    );
  });
});

app.listen(4001, () => {
    console.log('Server running at port 4001');
});
