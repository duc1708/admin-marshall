import React, { useState } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import ShowProduct from '../components/showProduct'; // Import component hiển thị sản phẩm
import '../assets/styles/product.css';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState('1'); // Loại sản phẩm mặc định
    const [selectedCategoryName, setSelectedCategoryName] = useState('Loa di động'); // Tên loại sản phẩm mặc định

    const handleCategoryChange = (category, categoryName) => {
        setSelectedCategory(category);
        setSelectedCategoryName(categoryName); // Cập nhật tên loại sản phẩm
    };

    return (
        <div className='products'>
            <ReactBootstrap.Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <div className='filtered inline-flex'>
                    <h6>Filters</h6>
                    <ReactBootstrap.Dropdown className='btn-filtered'>
                        <ReactBootstrap.Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedCategoryName} {/* Hiển thị tên loại sản phẩm */}
                        </ReactBootstrap.Dropdown.Toggle>

                        <ReactBootstrap.Dropdown.Menu>
                            <ReactBootstrap.Nav variant="pills" className="flex-column">
                                <ReactBootstrap.Nav.Item>
                                    <ReactBootstrap.Nav.Link
                                        eventKey="loadidong"
                                        onClick={() => handleCategoryChange('1', 'Loa di động')}>
                                        Loa di động
                                    </ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav.Item>
                                <ReactBootstrap.Nav.Item>
                                    <ReactBootstrap.Nav.Link
                                        eventKey="loanghetrongnha"
                                        onClick={() => handleCategoryChange('2', 'Loa nghe trong nhà')}>
                                        Loa nghe trong nhà
                                    </ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav.Item>
                                <ReactBootstrap.Nav.Item>
                                    <ReactBootstrap.Nav.Link
                                        eventKey="limited"
                                        onClick={() => handleCategoryChange('3', 'Limited edition')}>
                                        Limited edition
                                    </ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav.Item>
                                <ReactBootstrap.Nav.Item>
                                    <ReactBootstrap.Nav.Link
                                        eventKey="inear"
                                        onClick={() => handleCategoryChange('4', 'Tai nghe In Ear')}>
                                        Tai nghe In Ear
                                    </ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav.Item>
                                <ReactBootstrap.Nav.Item>
                                    <ReactBootstrap.Nav.Link
                                        eventKey="onear"
                                        onClick={() => handleCategoryChange('5', 'Tai nghe On Ear')}>
                                        Tai nghe On Ear
                                    </ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav.Item>
                                <ReactBootstrap.Nav.Item>
                                    <ReactBootstrap.Nav.Link
                                        eventKey="wireless"
                                        onClick={() => handleCategoryChange('6', 'Tai nghe True wireless')}>
                                        Tai nghe True wireless
                                    </ReactBootstrap.Nav.Link>
                                </ReactBootstrap.Nav.Item>
                            </ReactBootstrap.Nav>
                        </ReactBootstrap.Dropdown.Menu>
                    </ReactBootstrap.Dropdown>
                </div>

                <div className='listproducts'>
                    <ShowProduct selectedCategory={selectedCategory} /> {/* Truyền selectedCategory */}
                </div>
            </ReactBootstrap.Tab.Container>
        </div>
    );
};

export default Products;
