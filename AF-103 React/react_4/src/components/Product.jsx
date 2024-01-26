import React, { useState } from "react";
import { editData, deleteData } from "../request";

const Product = ({ item, isAdmin, data, setData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...item });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  
    if (confirmDelete) {
      try {
        await deleteData(id);
        const updatedProducts = data.filter((product) => product.id !== id);
        setData(updatedProducts);
      } catch (error) {
        console.error(error);
        alert("try again && refresh");
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await editData(editedProduct.id, editedProduct);
      const updatedData = data.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      setData(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  return (
    <>
      <tr>
        {isEditing ? (
          <>
            <td>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </td>
          </>
        ) : (
          <>
            <td>{item.name}</td>
            <td>{item.price}$</td>
            {isAdmin && (
              <td>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            )}
          </>
        )}
      </tr>
    </>
  );
};

export default Product;
