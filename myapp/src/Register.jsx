import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username,
        password
      });
      
      if (response.status === 201) {
        setSuccess('Registration successful!');
        setError('');
        setTimeout(() => navigate('/login'), 2000); 
      }
    } catch (err) {
      setSuccess('');
      if (err.response) {
        setError(err.response.data.detail || 'Registration failed');
      } else {
        setError('Network error');
      }
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div id="register-page" className="auth-page">
      <h1 className="auth-heading">Register</h1>
      <form onSubmit={handleRegister} id="register-form" className="auth-form">
        <div className="form-field" id="username-field">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter a username:"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field" id="password-field">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter a password:"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" id="register-button" className="form-button">Register</button>
      </form>
      {success && <p id="register-success-message" className="success-message">{success}</p>}
      {error && <p id="register-error-message" className="error-message">{error}</p>}
      <div id="login-redirect" className="redirect-container">
        <span id="login-redirect-text">Already a user?</span>
        <button onClick={handleLoginRedirect} id="login-redirect-button" className="redirect-button">Login</button>
      </div>
    </div>
  );
};

export default Register;
