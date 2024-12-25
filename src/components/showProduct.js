import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';

const ShowProduct = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showModalAddProduct, setShowModalAddProduct] = useState(false);
    const [productDetails, setProductDetails] = useState({
        tenSp: '',
        giaBan: '',
        maLoai: '',
        noiDung: '',
        anhDD: '',
        anhDD1: '',
        anhDD2: '',
        thuongHieu: '',
        maKm: '',
        phanTram: '',
        trangThai: '',
        anhmota1: '',
        anhmota2: '',
        anhmota3: '',
        anhmota4: '',
        anhmota5: '',
        anhmota6: '',
        amthanh: '',
        thietke: '',
        thoiLuong: '',
        tuyChinh: '',
        sao: '',
        mau: '',
        ungDung: '',
        loaiKetNoi: '',
        pin: '',
        thoiLuongPin: '',
        kichThuoc: '',
        thoiGianSac: '',
        maSP: '' // Make sure to include the product ID
    });

    const fetchProductsByCategory = (category) => {
        axios.get(`${process.env.REACT_APP_API_URL_ADMIN}products/${category}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };

    useEffect(() => {
        fetchProductsByCategory(selectedCategory);
    }, [selectedCategory]);

    // Handle edit button click
    const handleEdit = (product) => {
        setProductDetails(product); // Populate form with product details
        setShowModal(true); // Show the modal
    };

    const handleUpdateProduct = () => {
        axios.put(`${process.env.REACT_APP_API_URL_ADMIN}products/${productDetails.maSP}`, productDetails)
            .then(response => {
                alert('Product updated successfully!');
                setShowModal(false);
                fetchProductsByCategory(selectedCategory);
            })
            .catch(error => {
                console.error("Error updating product:", error);
            });
    };

    const handleAddProduct = () => {
        setShowModalAddProduct(true); // Show the modal to add a new product
        setProductDetails({
            tenSp: '',
            giaBan: '',
            maLoai: '',
            noiDung: '',
            anhDD: '',
            anhDD1: '',
            anhDD2: '',
            thuongHieu: '',
            maKm: '',
            phanTram: '',
            trangThai: '',
            anhmota1: '',
            anhmota2: '',
            anhmota3: '',
            anhmota4: '',
            anhmota5: '',
            anhmota6: '',
            amthanh: '',
            thietke: '',
            thoiLuong: '',
            tuyChinh: '',
            sao: '',
            mau: '',
            ungDung: '',
            loaiKetNoi: '',
            pin: '',
            thoiLuongPin: '',
            kichThuoc: '',
            thoiGianSac: '',
            maSP: '' // Clear product details for a new product
        }); // Clear product details for new product
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    // Handle form submission to add new product
    const handleAddNewProduct = () => {
        axios.post(`${process.env.REACT_APP_API_URL_ADMIN}products`, productDetails)
            .then(response => {
                alert('Product added successfully!');
                setShowModalAddProduct(false); // Close the modal
                fetchProductsByCategory(selectedCategory); // Refresh product list
            })
            .catch(error => {
                console.error("Error adding product:", error);
            });
    };

    return (
        <div className="products-list">
            <button style={{border:'none', background:'#000', color:'#fff',
             padding:'5px 5px 5px 5px', fontSize:'13px', fontWeight:'500',
             height:'40px', width:'150px'
            
            }} onClick={() => handleAddProduct()}>Thêm sản phẩm</button>
            <Row>
                {products.map(product => (
                    <Col sm={3} key={product.maSP}>
                        <div className="product-item">
                            <img src={product.anhDD} alt={product.tenSp} />
                            <p style={{ fontSize: '13px', textAlign: 'center', fontWeight: '500' }}>{product.tenSp}</p>
                            <p style={{ fontSize: '13px', textAlign: 'center', fontWeight: '500' }} >
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giaBan)}
                            </p>
                            <div className='inline-flex'>
                                <img id='remove' src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733898157/trash_lpblzl.png'} alt='Delete' />
                                <img id='edit' src={'https://res.cloudinary.com/deuqzffc4/image/upload/v1733898158/modification_qaw1mr.png'} alt='Edit' onClick={() => handleEdit(product)} />
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Modal for editing product */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Product Name */}
                        <Form.Group controlId="tenSp">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                name="tenSp"
                                value={productDetails.tenSp}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Price */}
                        <Form.Group controlId="giaBan">
                            <Form.Label>Giá bán</Form.Label>
                            <Form.Control
                                type="number"
                                name="giaBan"
                                value={productDetails.giaBan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Description */}
                        <Form.Group controlId="noiDung">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="noiDung"
                                value={productDetails.noiDung}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Main Image */}
                        <Form.Group controlId="anhDD">
                            <Form.Label>Ảnh 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhDD"
                                value={productDetails.anhDD}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Additional Images */}
                        <Form.Group controlId="anhDD1">
                            <Form.Label>Ảnh 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhDD1"
                                value={productDetails.anhDD1}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhDD2">
                            <Form.Label>Ảnh 3</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhDD2"
                                value={productDetails.anhDD2}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Additional Descriptions */}
                        <Form.Group controlId="anhmota1">
                            <Form.Label>Ảnh mô tả 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota1"
                                value={productDetails.anhmota1}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota2">
                            <Form.Label>Ảnh mô tả 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota2"
                                value={productDetails.anhmota2}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota3">
                            <Form.Label>Ảnh mô tả 3</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota3"
                                value={productDetails.anhmota3}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota4">
                            <Form.Label>Ảnh mô tả 4</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota4"
                                value={productDetails.anhmota4}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota5">
                            <Form.Label>Ảnh mô tả 5</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota5"
                                value={productDetails.anhmota5}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota6">
                            <Form.Label>Ảnh mô tả 6</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota6"
                                value={productDetails.anhmota6}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Brand */}
                        <Form.Group controlId="thuongHieu">
                            <Form.Label>Thương hiệu</Form.Label>
                            <Form.Control
                                type="text"
                                name="thuongHieu"
                                value={productDetails.thuongHieu}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Discount and Status */}
                        <Form.Group controlId="phanTram">
                            <Form.Label>Phần trăm</Form.Label>
                            <Form.Control
                                type="number"
                                name="phanTram"
                                value={productDetails.phanTram}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="trangThai">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Control
                                type="text"
                                name="trangThai"
                                value={productDetails.trangThai}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Technical Specifications */}
                        <Form.Group controlId="mau">
                            <Form.Label>Màu</Form.Label>
                            <Form.Control
                                type="text"
                                name="mau"
                                value={productDetails.mau}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="ungDung">
                            <Form.Label>Ứng dụng</Form.Label>
                            <Form.Control
                                type="text"
                                name="ungDung"
                                value={productDetails.ungDung}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="loaiKetNoi">
                            <Form.Label>Loại kết nối</Form.Label>
                            <Form.Control
                                type="text"
                                name="loaiKetNoi"
                                value={productDetails.loaiKetNoi}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="pin">
                            <Form.Label>Pin</Form.Label>
                            <Form.Control
                                type="text"
                                name="pin"
                                value={productDetails.pin}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="thoiLuongPin">
                            <Form.Label>Thời lượng pin</Form.Label>
                            <Form.Control
                                type="text"
                                name="thoiLuongPin"
                                value={productDetails.thoiLuongPin}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="kichThuoc">
                            <Form.Label>Kích thước</Form.Label>
                            <Form.Control
                                type="text"
                                name="kichThuoc"
                                value={productDetails.kichThuoc}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="thoiGianSac">
                            <Form.Label>Thời gian sạc</Form.Label>
                            <Form.Control
                                type="text"
                                name="thoiGianSac"
                                value={productDetails.thoiGianSac}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Ratings */}
                        <Form.Group controlId="sao">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="sao"
                                value={productDetails.sao}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Add modal for adding new product */}
            <Modal show={showModalAddProduct} onHide={() => setShowModalAddProduct(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Product Name */}
                        <Form.Group controlId="maLoai">
                            <Form.Label>Mã Loại</Form.Label>
                            <Form.Control
                                type="number"
                                name="maLoai"
                                value={productDetails.maLoai}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="tenSp">
                            <Form.Label>Tên sản phẩm</Form.Label>
                            <Form.Control
                                type="text"
                                name="tenSp"
                                value={productDetails.tenSp}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Price */}
                        <Form.Group controlId="giaBan">
                            <Form.Label>Giá bán</Form.Label>
                            <Form.Control
                                type="number"
                                name="giaBan"
                                value={productDetails.giaBan}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Description */}
                        <Form.Group controlId="noiDung">
                            <Form.Label>Nội dung</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="noiDung"
                                value={productDetails.noiDung}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Main Image */}
                        <Form.Group controlId="anhDD">
                            <Form.Label>Ảnh 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhDD"
                                value={productDetails.anhDD}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Additional Images */}
                        <Form.Group controlId="anhDD1">
                            <Form.Label>Ảnh 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhDD1"
                                value={productDetails.anhDD1}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhDD2">
                            <Form.Label>Ảnh 3</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhDD2"
                                value={productDetails.anhDD2}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Additional Descriptions */}
                        <Form.Group controlId="anhmota1">
                            <Form.Label>Ảnh mô tả 1</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota1"
                                value={productDetails.anhmota1}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* More fields as needed */}
                        <Form.Group controlId="anhmota2">
                            <Form.Label>Ảnh mô tả 2</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota2"
                                value={productDetails.anhmota2}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota3">
                            <Form.Label>Ảnh mô tả 3</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota3"
                                value={productDetails.anhmota3}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota4">
                            <Form.Label>Ảnh mô tả 4</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota4"
                                value={productDetails.anhmota4}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota5">
                            <Form.Label>Ảnh mô tả 5</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota5"
                                value={productDetails.anhmota5}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="anhmota6">
                            <Form.Label>Ảnh mô tả 6</Form.Label>
                            <Form.Control
                                type="text"
                                name="anhmota6"
                                value={productDetails.anhmota6}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Brand */}
                        <Form.Group controlId="thuongHieu">
                            <Form.Label>Thương hiệu</Form.Label>
                            <Form.Control
                                type="text"
                                name="thuongHieu"
                                value={productDetails.thuongHieu}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Discount and Status */}
                        <Form.Group controlId="phanTram">
                            <Form.Label>Phần trăm</Form.Label>
                            <Form.Control
                                type="number"
                                name="phanTram"
                                value={productDetails.phanTram}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="trangThai">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Control
                                type="text"
                                name="trangThai"
                                value={productDetails.trangThai}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Technical Specifications */}
                        <Form.Group controlId="mau">
                            <Form.Label>Màu</Form.Label>
                            <Form.Control
                                type="text"
                                name="mau"
                                value={productDetails.mau}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="ungDung">
                            <Form.Label>Ứng dụng</Form.Label>
                            <Form.Control
                                type="text"
                                name="ungDung"
                                value={productDetails.ungDung}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="loaiKetNoi">
                            <Form.Label>Loại kết nối</Form.Label>
                            <Form.Control
                                type="text"
                                name="loaiKetNoi"
                                value={productDetails.loaiKetNoi}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="pin">
                            <Form.Label>Pin</Form.Label>
                            <Form.Control
                                type="text"
                                name="pin"
                                value={productDetails.pin}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="thoiLuongPin">
                            <Form.Label>Thời lượng pin</Form.Label>
                            <Form.Control
                                type="text"
                                name="thoiLuongPin"
                                value={productDetails.thoiLuongPin}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="kichThuoc">
                            <Form.Label>Kích thước</Form.Label>
                            <Form.Control
                                type="text"
                                name="kichThuoc"
                                value={productDetails.kichThuoc}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="thoiGianSac">
                            <Form.Label>Thời gian sạc</Form.Label>
                            <Form.Control
                                type="text"
                                name="thoiGianSac"
                                value={productDetails.thoiGianSac}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        {/* Ratings */}
                        <Form.Group controlId="sao">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                type="number"
                                name="sao"
                                value={productDetails.sao}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalAddProduct(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddNewProduct}>
                        Add Product
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShowProduct;
