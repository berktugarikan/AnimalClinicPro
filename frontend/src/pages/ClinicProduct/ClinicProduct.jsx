import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClinicProduct() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [clinicId, setClinicId] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const clinicId = localStorage.getItem("clinicId");
        setClinicId(clinicId);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName: productName,
            price: price,
            clinicId: clinicId
        };

        try {
            const response = await axios.post('http://localhost:8080/api/clinic-products', newProduct);
            console.log(response.data);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error adding clinic product:', error);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            window.location.reload();
        }
    }, [isSuccess]);

    return (
        <div className="container">
            <h1 className="text-center">Add Clinic Product</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
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
                        <button type="submit" className="btn btn-primary">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ClinicProduct;
