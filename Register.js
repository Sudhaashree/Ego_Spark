import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', { name, email, password, location });
      localStorage.setItem('token', data.token);
      navigate('/log');
    } catch (err) {
      alert(err.response.data.msg || 'Error');
    }
  };

  return (
    <div className="form-container">
      <h2>🎇 EcoSpark Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <input type="text" placeholder="City" value={location} onChange={e=>setLocation(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
