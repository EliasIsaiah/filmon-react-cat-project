import React, { useState, useEffect } from "react";
import { getCats, createCat, deleteCat } from "./services/api";
import "./App.css";

function App() {
  const [cats, setCats] = useState([]);
  const [newCat, setNewCat] = useState({
    image: "",
    name: "",
    color: "",
    age: "",
  });

  const fetchCats = async () => {
    const response = await getCats();
    setCats(response.data.cats);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCat({ ...newCat, [name]: value });
  };

  const handleCreateCat = async () => {
    console.log("newCat", newCat);
    await createCat(newCat);
    fetchCats();
    setNewCat({ image: "", name: "", color: "", age: "" });
  };

  const handleDeleteCat = async (id) => {
    await deleteCat(id);
    fetchCats();
  };

  return (
    <div>
      <h1>Cat App</h1>
      <div>
        {/* <label for="image">Image</label>
        <input
          onChange={handleImageInputChange}
          type="file"
          name="image"
          accept="image/png, image/jpeg"
        /> */}
        <input
          type="text"
          name="image"
          placeholder="imageURI"
          value={newCat.image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCat.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={newCat.color}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={newCat.age}
          onChange={handleInputChange}
        />
        <button onClick={handleCreateCat}>Add Cat</button>
      </div>
      <ul>
        {cats.map((cat) => (
          <li key={cat._id}>
            <img className="avatar" src={cat.image} /> - {cat.name} -{" "}
            {cat.color} - {cat.age}
            <button onClick={() => handleDeleteCat(cat._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
