import  { useState } from "react";
import Product from "./Product";
import AddProduct from "./AddProduct";

const Products = ({ data, isAdmin, setData }) => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [sortPrice, setSortPrice] = useState(false); 
  const [sortDate, setSortDate] = useState(null);

  const handleSortByPrice = () => {
    const sortedData = [...data].sort((a, b) => a.price - b.price);
    setSortPrice(!sortPrice);
    setData(sortedData);
  };

 const handleSortByDate = () => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.createAt);
      const dateB = new Date(b.createAt);
      return sortDate ? dateA - dateB : dateB - dateA;
    });
    setSortPrice(false); 
    setSortDate(!sortDate);
    setData(sortedData);
  };
  

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSortByPrice}>Sort by Price</button>
        <button onClick={handleSortByDate}>Sort by Date</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => (sortPrice ? a.price - b.price : b.price - a.price))
            .map((item) => (
              <Product
                key={item.id}
                item={item}
                isAdmin={isAdmin}
                data={data}
                setData={setData}
              />
            ))}
        </tbody>
      </table>

      {isAdmin && <AddProduct data={data} setData={setData} />}
    </>
  );
};

export default Products;
