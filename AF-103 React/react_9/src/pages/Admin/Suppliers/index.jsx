import { useState } from "react";
import { Input, Button } from 'antd';
import { postProduct } from "../../../service/api/request/request.js";
import { useNavigate } from "react-router-dom";

const Suppliers = () => {
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setNewCategory({ ...newCategory, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setNewCategory({ ...newCategory, description: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postProduct(newCategory);
    navigate('/admin/products');
    setNewCategory({ name: '', description: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '80%',height:'80vh', margin: '0 auto', textAlign: 'center',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column' }}
    >
      <div style={{ marginBottom: '20px' }}>
        <label  htmlFor="name">Category Name: </label>
        <Input
          id="name"
          onChange={handleNameChange}
          value={newCategory.name}
          placeholder="Enter name"
          type="text"
          style={{ width: "100%" ,margin:'20px 0'}}
        />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="description">Category Description: </label>
        <Input
          id="description"
          onChange={handleDescriptionChange}
          value={newCategory.description}
          placeholder="Enter description"
          type="text"
          style={{ width: "100%" ,margin:'20px 0'}}
        />
      </div>
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </form>
  );
};

export default Suppliers;
