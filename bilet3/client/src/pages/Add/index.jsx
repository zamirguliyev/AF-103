import React, { useState, useEffect } from "react";
import "./index.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Row, Col, Table,Button } from 'antd'
import {Link} from 'react-router-dom'
import { Helmet } from "react-helmet";


let API_URL = "http://localhost:3000/api/biletthree";

const Add = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortedOrder, setSortedOrder] = useState(null);

    useEffect(() => {
        axios
            .get(`${API_URL}`)
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, [data]);

    const handleFilter = filteredInfo => {
        const { name, value } = filteredInfo;
        if (value) {
            const filtered = data.filter(item => {
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

    const handleSortColumn = columnKey => {
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

    const deletePost = async (id) => {
        try {
          await axios.delete(`${API_URL}/${id}`);
          console.log("Post deleted:", id);
          setData(data.filter((post) => post.id !== id));
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      };

    const validateSchema = Yup.object().shape({
        title: Yup.string().required(),
        price: Yup.number().required(),
        img: Yup.string()
            .required()
            .url(),
        meals: Yup.string().required(),
        ctg: Yup.string().required()
    });

    const formik = useFormik({
        initialValues: {
            title: "",
            price: 0,
            img: "",
            meals: "",
            ctg: ""
        },
        validationSchema: validateSchema,
        onSubmit: (values, actions) => {
            axios.post(`${API_URL}`, values);
            actions.resetForm();
        }
    });

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
            key: "id",
            sorter: true,
            sortOrder: sortedColumn === "id" && sortedOrder,
            onHeaderCell: () => ({ onClick: () => handleSortColumn("id") })
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            sorter: true,
            sortOrder: sortedColumn === "title" && sortedOrder,
            onHeaderCell: () => ({ onClick: () => handleSortColumn("title") }),
            ellipsis: true,
            onFilter: (value, record) =>
                record.title.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            sorter: true,
            sortOrder: sortedColumn === "price" && sortedOrder,
            onHeaderCell: () => ({ onClick: () => handleSortColumn("price") })
        },
        {
            title: "Category",
            dataIndex: "ctg",
            key: "ctg",
            sorter: true,
            sortOrder: sortedColumn === "ctg" && sortedOrder,
            onHeaderCell: () => ({ onClick: () => handleSortColumn("ctg") }),
            filters: [{ text: "dessert", value: "dessert" }, { text: "main", value: "main" }, { text: "drinks", value: "drinks" }],
            onFilter: (value, record) => record.ctg === value
        },
        {
            title: "Delete",
            key: 'key',
            dataIndex: 'key',
            render: (text, record) => (
                <Button type="primary" onClick={() => deletePost(record._id)}>
                    {"Delete"}
                </Button>
            ),

        }
    ];

    return (
        <>
         <Helmet>
                <meta charSet="utf-8" />
                <title>Add Page</title>
            </Helmet>
            <form className="add-form" onSubmit={formik.handleSubmit}>
                <div style={{display:'flex',gap:'20px'}}>
                <div className="add-input">
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        id="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        type={"text"}
                    />
                </div>

                <div className="add-input">
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type={"number"}
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                </div>
                </div>
              
              
              <div style={{display:'flex',gap:'20px'}}>
              <div className="add-input">
                    <label htmlFor="img">Img</label>
                    <input
                        type={"url"}
                        name="img"
                        id="img"
                        onChange={formik.handleChange}
                        value={formik.values.img}
                    />
                </div>
                <div className="add-input">
                    <label htmlFor="meals">Meals</label>
                    <input
                        id="meals"
                        type={"text"}
                        name="meals"
                        onChange={formik.handleChange}
                        placeholder="Meals"
                        value={formik.values.meals}
                    />
                </div>
              </div>
                <div className="add-input">
                    <label htmlFor="ctg">Ctg</label>
                    <select
                        name="ctg"
                        id="ctg"
                        helperText={formik.errors.ctg ? formik.errors.ctg : ""}
                        onChange={formik.handleChange}
                        value={formik.values.ctg}
                    >
                        <option value="main">Main</option>
                        <option value="dessert">Dessert</option>
                        <option value="drinks">Drinks</option>
                    </select>
                </div>

                <button disabled={loading} type={"submit"}>
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>

            <Row>
                <Col span={18}>
                    <Table
                        rowKey={(obj) => obj.id}
                        columns={columns}
                        dataSource={filteredData}
                        onChange={handleSort}
                        onFilter={handleFilter} />
                </Col>
            </Row>
        </>
    );
};

export default Add;
