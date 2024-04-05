import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

const GetData = () => {
    const [productData, setProductData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getdata');
                setProductData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (productId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete/${productId}`);
            if (response.data.success) {
                
                setProductData(productData.filter(product => product.Productid !== productId));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Product List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Category Name</th>
                            <th>Action</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((product) => (
                            <tr key={product.Productid}>
                                <td>{product.Productid}</td>
                                <td>{product.Productname}</td>
                                <td>{product.Categoryname}</td>
                                <td>
                                <button onClick={() => handleDelete(product.Productid)}>Delete</button>

                                    
                                    <Link to={`/update`}>
                                        <button>Update</button>
                                    </Link>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetData;
