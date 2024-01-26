import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Row, Col } from "antd";
import axios from "axios";

const First = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortedOrder, setSortedOrder] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleFilter = (filteredInfo) => {
    const { name, value } = filteredInfo;
    if (value) {
      const filtered = data.filter((item) => {
        if (name === "name") {
          return item[name]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        } else {
          return false;
        }
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleSortColumn = (columnKey) => {
    let order = sortedOrder === "ascend" ? "descend" : "ascend";
    setSortedOrder(order);
    setSortedColumn(columnKey);

    if (columnKey === "name") {
      const sortedFilteredData = [...filteredData].sort((a, b) =>
        order === "ascend"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
      setFilteredData(sortedFilteredData);
    } else {
      handleSort(columnKey, order);
    }
  };

  const handleSort = (columnKey, order) => {
    const sortedData = [...filteredData];
    if (columnKey !== "name") {
      sortedData.sort((a, b) => {
        if (order === "ascend") {
          return a[columnKey] > b[columnKey] ? 1 : -1;
        } else {
          return a[columnKey] < b[columnKey] ? 1 : -1;
        }
      });
    }
    setFilteredData(sortedData);
  };

  const showModal = (record) => {
    setVisible(true);
    setSelectedItem(record);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  const handleFilterByPH = (selectedPHValues) => {
    const filtered = data.filter((item) => selectedPHValues.includes(item.ph));
    setFilteredData(filtered);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: true,
      sortOrder: sortedColumn === "id" && sortedOrder,
      onHeaderCell: () => ({
        onClick: () => handleSortColumn("id"),
      }),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortOrder: sortedColumn === "name" && sortedOrder,
      onHeaderCell: () => ({
        onClick: () => handleSortColumn("name"),
      }),
      ellipsis: true,
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "ABV",
      dataIndex: "abv",
      key: "abv",
      sorter: true,
      sortOrder: sortedColumn === "abv" && sortedOrder,
      onHeaderCell: () => ({
        onClick: () => handleSortColumn("abv"),
      }),
    },
    {
      title: "PH",
      dataIndex: "ph",
      key: "ph",
      sorter: true,
      sortOrder: sortedColumn === "ph" && sortedOrder,
      onHeaderCell: () => ({
        onClick: () => handleSortColumn("ph"),
      }),
      filters: [
        { text: "3.2", value: 3.2 },
        { text: "4.2", value: 4.2 },
        { text: "4.4", value: 4.4 },
        { text: "5.2", value: 5.2 },
        { text: "5.3", value: 5.3 },
        { text: "5.6", value: 5.6 },
      ],
      onFilter: (value, record) => record.ph === value,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button type="primary" onClick={() => showModal(record)}>
          Info
        </Button>
      ),
    },
  ];

  return (
    <Row justify="center" align="middle">
      <Col span={18}>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Table Example</h1>
        <Table
          rowKey={(obj) => obj.id}
          columns={columns}
          dataSource={filteredData}
          onChange={handleSort}
          onFilter={handleFilter}
        />

        <Modal visible={visible} onCancel={closeModal} footer={null}>
          {selectedItem && (
            <div>
              <h2>{selectedItem.name}</h2>
              <p>{selectedItem.description}</p>
              <p>ABV: {selectedItem.abv}</p>
            </div>
          )}
        </Modal>
      </Col>
    </Row>
  );
};

export default First;
