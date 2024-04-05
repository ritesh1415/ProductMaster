import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Create = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    Productid: "",
    Productname: "",
    Categoryname: "",
  });

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value); // Add this line
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data..."); 
    try {
      const { data } = await axios.post("http://localhost:8080/create", {
        Productid: input.Productid,
        Productname: input.Productname,
        Categoryname: input.Categoryname
      });

      console.log("Server Response:", data);

      if (data.success !== undefined && data.success) {
        console.log("Successfully registered");
        alert("Registered successfully");
        navigate('/view');
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration", error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">Product Id</label>
          <input
            type='number'
            className="form-control"
            id="Productid"
            name="Productid"
            value={input.Productid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter product name"
            name="Productname"
            value={input.Productname}
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Category Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter category name"
            name="Categoryname"
            value={input.Categoryname}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginTop: '20px' }} className="btn btn-primary" >
        Create
        </button>

        
      </form>
    </div>
  );
};

export default Create;
