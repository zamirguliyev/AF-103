import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductByID } from "../../../service/api/request/request.js";

const Product = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getProductByID(id)
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  return (
    <>
    <Link to={'/admin/products'} style={{marginLeft:'50px'}}>Go Back</Link>
     <div style={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      height:'80vh'
     }}>
     <h3>Name: {product.name}</h3>
     </div>
    </>
  );
};

export default Product;
