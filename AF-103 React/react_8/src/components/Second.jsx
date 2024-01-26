import React, { useState, useEffect } from "react";
import { Pagination, Select, Input, Button, Card, Row, Col, Modal,Skeleton  } from "antd";
import Slider from "antd/es/slider";
import axios from "axios";
const { Option } = Select;

const Second = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [abvValue, setAbvValue] = useState([0, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [abvValue]);

  const fetchData = () => {
    axios
      .get(`https://api.punkapi.com/v2/beers`)
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data.slice(0, dataPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    axios
      .get(
        `https://api.punkapi.com/v2/beers?beer_name=${value}`
      )
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data.slice(0, dataPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleAbvChange = (value) => {
    setAbvValue(value);
  };

  const handleFilterSubmit = () => {
    axios
      .get(`https://api.punkapi.com/v2/beers?abv_gt=${abvValue}`)
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data.slice(0, dataPerPage));
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredData(data.slice(startIndex, endIndex));
  };

  const handleDataPerPageChange = (value) => {
    setDataPerPage(value);
    setFilteredData(data.slice(0, value));
  };

  const showModal = (record) => {
    setVisible(true);
    setSelectedItem(record);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Card Example</h1>
      <Input.Search
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name"
        style={{ width: 200, marginLeft: "calc(50% - 100px)" }}
      />
      <Slider
        value={abvValue}
        onChange={handleAbvChange}
        min={0}
        max={100}
        tipFormatter={(value) => `${value}%`}
        style={{ width: 200, marginLeft: "calc(50% - 100px)" }}
      />
      <Button
        type="primary"
        onClick={handleFilterSubmit}
        style={{ marginLeft: "calc(50% - 30px)" }}
      >
        Filter
      </Button>
      <div style={{ margin: "20px 90px" }}>
      <Row gutter={[16, 16]}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={8} lg={8} xl={8}>
              <Card
                style={{ width: 300, margin: "20px 0" }}
                cover={
                  <img
                    alt={item.name}
                    src={item.image_url}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      margin: "20px 0",
                    }}
                  />
                }
              >
                <p><b>Name:</b> {item.name}</p>
                <p style={{margin:"20px 0"}}><b>ABV:</b> {item.abv}%</p>
                <Button type="primary" onClick={() => showModal(item)}>
                  Info
                </Button>
              </Card>
            </Col>
          ))
        ) : (
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <Skeleton active />
          </Col>
        )}
      </Row>
        <Pagination
          current={currentPage}
          total={data.length}
          pageSize={dataPerPage}
          onChange={handlePageChange}
        />
        <Select
          defaultValue={10}
          style={{ width: 80, marginLeft: "80%" }}
          onChange={handleDataPerPageChange}
        >
          <Option value={10}>10</Option>
          <Option value={15}>15</Option>
          <Option value={20}>20</Option>
          <Option value={25}>25</Option>
          <Option value={50}>50</Option>
          <Option value={100}>100</Option>
        </Select>
      </div>
      <Modal visible={visible} onCancel={closeModal} footer={null}>
        {selectedItem && (
          <div>
            <h2>
              <b>Name:</b> {selectedItem.name}
            </h2>
            <p style={{ margin: "20px 0" }}>
              <b>Desc:</b> {selectedItem.description}
            </p>
            <p>
              <b>Food Pairing:</b> {selectedItem.food_pairing}
            </p>
            <p style={{ margin: "20px 0" }}>
              <b>ABV:</b> {selectedItem.abv}%
            </p>
            <p style={{marginBottom:'20px'}}>
              <b>PH:</b> {selectedItem.ph}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Second;
