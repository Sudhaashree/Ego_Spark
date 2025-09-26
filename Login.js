import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });

      // ✅ If login is successful
      if (data && data.token) {
        localStorage.setItem('token', data.token);         // existing
        localStorage.setItem('isLoggedIn', 'true');        // ✅ new
        localStorage.setItem('userEmail', email);           // optional
        navigate('/log'); // go to next page
      } else {
        alert('Invalid credentials');
      }

    } catch (err) {
      alert(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="form-container">
      <h2>🎇 EcoSpark Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
};

export default Login;
