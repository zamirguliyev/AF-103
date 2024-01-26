import { useState, useEffect } from "react";
import "./index.scss";
import axios from "axios";
import { Helmet } from "react-helmet";

let API_URL = "http://localhost:3000/api/biletthree";

const Add = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const deletePost = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log("Post deleted:", id);
      setData(data.filter((post) => post._id !== id));
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

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Page</title>
      </Helmet>

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
            <h3>{post.title}</h3>
            <p>Price: {post.price}</p>
            <p>Meals: {post.meals}</p>
            <p>Category: {post.ctg}</p>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Add;
