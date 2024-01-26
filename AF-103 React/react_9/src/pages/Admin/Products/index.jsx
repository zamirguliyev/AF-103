import { useState, useEffect } from "react";
import { Row, Col, Table,Button } from "antd";
import { getAllProducts } from "../../../service/api/request/request.js";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProducts(); 
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" >
          <Link to={`/admin/product/${record.id}`}>Go</Link>
        </Button>
      ),
    },
  ];

  return (
    <div>
    <h1 style={{textAlign:"center"}}>Products</h1>
    <Row justify="center">
      <Col span={16}>
        <Table dataSource={products} columns={columns} />
      </Col>
    </Row>
  </div>
  );
};

export default Products;
