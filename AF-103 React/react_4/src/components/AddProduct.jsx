import { useState } from "react";
import { postData } from "../request";

const AddProduct = ({ data, setData }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    discountPercentage: false,
    createAt: new Date()
  });

  const handleAddProduct = async () => {
    try {
      await postData(newProduct);
      const updatedData = [...data, newProduct];
      setData(updatedData);
      setIsAdding(false);
      setNewProduct({ name: "", price: 0, discountPercentage: false, createAt: new Date() });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel =()=>{
    setIsAdding(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return (
    <div>
      {isAdding ? (
        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
          <label htmlFor="check">isDiscounted</label>
          <input
            type="checkbox"
            name="discountPercentage"
            value={newProduct.discountPercentage}
            onChange={handleInputChange}
            id="check"
          />
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)}>Add Product</button>
      )}
    </div>
  );
};

export default AddProduct;
