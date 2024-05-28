import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

function ClinicProduct() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [clinicId, setClinicId] = useState('');
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId");
        setClinicId(clinicId);
        fetchProducts(clinicId);
    }, []);

    const fetchProducts = async (clinicId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/clinic-products/clinic/${clinicId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName: productName,
            price: price,
            clinicId: clinicId
        };

        try {
            if (editMode && currentProductId) {
                await axios.put(`http://localhost:8080/api/clinic-products/${currentProductId}`, newProduct);
            } else {
                await axios.post('http://localhost:8080/api/clinic-products', newProduct);
            }
            setIsSuccess(true);
            setShowModal(false); // Close the modal after submission
        } catch (error) {
            console.error('Error adding/updating clinic product:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            fetchProducts(clinicId); // Reload products after adding/updating
            setIsSuccess(false); // Reset success state
        }
    }, [isSuccess, clinicId]);

    const handleEdit = (product) => {
        setProductName(product.productName);
        setPrice(product.price);
        setCurrentProductId(product.id);
        setEditMode(true);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/clinic-products/${currentProductId}`);
            fetchProducts(clinicId); // Reload products after deletion
            setShowDeleteModal(false); // Close delete modal
        } catch (error) {
            console.error('Error deleting clinic product:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setProductName('');
        setPrice('');
        setEditMode(false);
        setCurrentProductId(null);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className="text-center">Clinic Products</h1>
            <div className="row justify-content-center mb-3">
                <div className="col-md-6 text-center">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Add Product
                    </Button>
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-md-6 text-center">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.productName}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            <Button variant="secondary" onClick={() => handleEdit(product)}>Edit</Button>{' '}
                                            <Button variant="danger" onClick={() => {
                                                setCurrentProductId(product.id);
                                                setShowDeleteModal(true);
                                            }}>Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No products found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Clinic Product' : 'Add Clinic Product'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="productName"
                                name="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input
                                type="number"
                                className="form-control"
                                id="price"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {editMode ? 'Update Product' : 'Add Product'}
                        </button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>This product will be deleted. Are you sure?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel</Button>
                    <Button variant="danger" onClick={handleDelete}>Yes, Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ClinicProduct;