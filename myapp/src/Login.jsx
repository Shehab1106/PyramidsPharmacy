import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access);
        setSuccess('Login successful!');
        setError('');
        setTimeout(() => navigate('/medication-list'), 2000);
      }
    } catch (err) {
      setSuccess('');
      if (err.response) {
        setError(err.response.data.detail || 'Invalid credentials');
      } else {
        setError('Network error');
      }
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div id="login-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin} id="login-form">
        <div className="form-field" id="username-field">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field" id="password-field">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" id="login-button" className="form-button">
          Login
        </button>
      </form>
      {success && <p id="success-message-login" className="success-message">{success}</p>}
      {error && <p id="error-message-login" className="error-message">{error}</p>}
      <div id="register-link">
        <span>Not a user? </span>
        <button onClick={handleRegisterRedirect} id="register-button">
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
