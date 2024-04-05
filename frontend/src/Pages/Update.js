

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Update = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        Productid: '',
        Productname: '',
        Categoryname: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/update/${formData.Productid}`, formData);
            console.log('Server Response:', response.data);
            alert('Product updated successfully');
            navigate('/view')
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Productid">Product ID:</label>
                    <input type="number" id="Productid" name="Productid" value={formData.Productid} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="Productname">Product Name:</label>
                    <input type="text" id="Productname" name="Productname" value={formData.Productname} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="Categoryname">Category Name:</label>
                    <input type="text" id="Categoryname" name="Categoryname" value={formData.Categoryname} onChange={handleChange} required />
                </div>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default Update;
