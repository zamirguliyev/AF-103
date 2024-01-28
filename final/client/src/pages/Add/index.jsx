import { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

let API_URL = "http://localhost:3000/api/final";

const Add = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const validationSchema = yup.object({
    title: yup.string("Enter your title").required("Title is required"),
    price: yup.number().min(0).required("Price is required"),
    img: yup.string().required(),
  });

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [data]);

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log("Post deleted:", id);
      setData(data.filter((post) => post._id !== id));
      window.alert("Post deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const filteredData = sortedData.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      price: 0,
      img: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, action) => {
      axios.post(`${API_URL}`, values);
      action.resetForm();
      window.alert("New product added");
    },
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Page</title>
      </Helmet>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          margin: "40px 0",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="title"
            name="title"
            label="title"
            type="text"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <br />
          <br />
          <TextField
            id="price"
            name="price"
            label="price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <br />
          <br />
          <TextField
            id="img"
            name="img"
            label="img"
            type="url"
            value={formik.values.img}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.img && Boolean(formik.errors.img)}
            helperText={formik.touched.img && formik.errors.img}
          />
          <br />
          <br />
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
          <br />
        </form>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </div>
      <div className="data-container">
        {filteredData.map((post) => (
          <div key={post._id} className="post-item">
            <img src={post.img} alt={post.title} />
            <h3>
              <Link to={`/product/${post._id}`}>Title: {post.title}</Link>
            </h3>
            <p>Price: {post.price}</p>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Add;
