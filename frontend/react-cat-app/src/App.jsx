import React, { useState, useEffect } from 'react';
import { getCats, createCat, deleteCat } from './services/api';

function App() {
  const [cats, setCats] = useState([]);
  const [newCat, setNewCat] = useState({ name: '', color: '', age: '' });

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
    await createCat(newCat);
    fetchCats();
    setNewCat({ name: '', color: '', age: '' });
  };

  const handleDeleteCat = async (id) => {
    await deleteCat(id);
    fetchCats();
  };

  return (
    <div>
      <h1>Cat App</h1>
      <div>
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
            {cat.name} - {cat.color} - {cat.age}
            <button onClick={() => handleDeleteCat(cat._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
