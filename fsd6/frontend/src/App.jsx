import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: 0, quantity: 0 });

  const API_URL = 'http://localhost:5000/products';

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, form);
    fetchProducts();
  };

  const updateQuantity = async (id, newQty) => {
    await axios.put(`${API_URL}/${id}`, { quantity: newQty });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory Manager</h1>
      <form onSubmit={addProduct}>
        <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="number" placeholder="Price" onChange={e => setForm({ ...form, price: e.target.value })} />
        <input type="number" placeholder="Qty" onChange={e => setForm({ ...form, quantity: e.target.value })} />
        <button type="submit">Add Product</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {products.map(p => (
          <div key={p._id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <span>{p.name} - ${p.price} | Stock: {p.quantity} </span>
            <button onClick={() => updateQuantity(p._id, p.quantity + 1)}>+</button>
            <button onClick={() => updateQuantity(p._id, p.quantity - 1)}>-</button>
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;