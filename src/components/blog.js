import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import '../assets/styles/blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formValues, setFormValues] = useState({
    tenbaiviet: '',
    img: '',
    noiDung: ''
  });
  const [newBlog, setNewBlog] = useState({
    tenbaiviet: '',
    img: '',
    noiDung: ''
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL_ADMIN}blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error('Có lỗi khi gọi API:', error);
      });
  };

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setFormValues({
      tenbaiviet: blog.tenbaiviet,
      img: blog.img,
      noiDung: blog.noiDung
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewBlogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL_ADMIN}blogs/${selectedBlog.id}`, formValues)
      .then(() => {
        fetchBlogs(); // Refresh the blog list
        setShowEditModal(false);
      })
      .catch((error) => {
        console.error('Có lỗi khi cập nhật bài viết:', error);
      });
  };

  const handleAddBlog = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL_ADMIN}blogs`, newBlog)
      .then(() => {
        fetchBlogs(); // Refresh the blog list
        setShowAddModal(false);
        setNewBlog({ tenbaiviet: '', img: '', noiDung: '' });
      })
      .catch((error) => {
        console.error('Có lỗi khi thêm bài viết:', error);
      });
  };

  const handleDeleteBlog = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL_ADMIN}blogs/${id}`)
      .then(() => {
        fetchBlogs(); // Refresh the blog list
      })
      .catch((error) => {
        console.error('Có lỗi khi xóa bài viết:', error);
      });
  };

  return (
    <div className="blog">
      <Button variant="success" onClick={() => setShowAddModal(true)}>
        Thêm Bài Viết
      </Button>

      <Row>
        {blogs.map((blog) => (
          <Col sm={3} key={blog.id}>
            <div className="blog-item">
              <img src={blog.img} alt={blog.tenbaiviet} />
              <p
                style={{
                  fontSize: '13px',
                  textAlign: 'center',
                  fontWeight: '500',
                  marginTop: '10px',
                }}
              >
                {blog.tenbaiviet}
              </p>
              <div style={{ marginLeft: '70px' }} className="inline-flex">
                <img
                  id="remove"
                  src={
                    'https://res.cloudinary.com/deuqzffc4/image/upload/v1733898157/trash_lpblzl.png'
                  }
                  alt="remove"
                  onClick={() => handleDeleteBlog(blog.id)}
                  style={{ cursor: 'pointer' }}
                />
                <img
                  id="edit"
                  src={
                    'https://res.cloudinary.com/deuqzffc4/image/upload/v1733898158/modification_qaw1mr.png'
                  }
                  alt="edit"
                  onClick={() => handleEditClick(blog)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Bài Viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTenBaiViet">
              <Form.Label>Tên Bài Viết</Form.Label>
              <Form.Control
                type="text"
                name="tenbaiviet"
                value={formValues.tenbaiviet}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formImg">
              <Form.Label>Link ảnh bài viết</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={formValues.img}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formNoiDung">
              <Form.Label>Nội dung bài viết</Form.Label>
              <Form.Control
                type="text"
                name="noiDung"
                value={formValues.noiDung}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Lưu Thay Đổi
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Bài Viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewTenBaiViet">
              <Form.Label>Tên Bài Viết</Form.Label>
              <Form.Control
                type="text"
                name="tenbaiviet"
                value={newBlog.tenbaiviet}
                onChange={handleNewBlogChange}
              />
            </Form.Group>
            <Form.Group controlId="formNewImg">
              <Form.Label>Link ảnh bài viết</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={newBlog.img}
                onChange={handleNewBlogChange}
              />
            </Form.Group>
            <Form.Group controlId="formNewNoiDung">
              <Form.Label>Nội dung bài viết</Form.Label>
              <Form.Control
                type="text"
                name="noiDung"
                value={newBlog.noiDung}
                onChange={handleNewBlogChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleAddBlog}>
            Thêm Bài Viết
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Blog;
