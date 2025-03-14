import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchAckId, setSearchAckId] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // Move state declaration to top
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('https://vansh-2k25.onrender.com/api/login', formData);
        
        if (response.data.success) {
          setMessage('Login successful!');
          setIsLoggedIn(true);
          setUserData(response.data.user);
          setShowSearch(true);
          setLoginSuccess(true);
        }
      } catch (error) {
        console.error('Login error:', error);
        const errorMessage = error.response?.data?.error || 'Invalid username or password';
        setMessage(errorMessage);
      }
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'Username must be 3-20 characters and can only contain letters, numbers, and underscores';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };
  // Add this new function after state declarations
  const handleDownloadAcknowledgment = async (username) => {
    try {
      // First get the acknowledgment ID for the username
      const userResponse = await axios.get(`https://vansh-2k25.onrender.com/api/user-acknowledgment/${username}`);
      const acknowledgmentId = userResponse.data.acknowledgement_id;
      
      // Then download the PDF using the acknowledgment ID
      const response = await axios.get(`https://vansh-2k25.onrender.com/api/download-acknowledgment/${acknowledgmentId}`, {
        responseType: 'blob',
        headers: {
          'Accept': 'application/pdf'
        }
      });
      
      // Create and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${acknowledgmentId}.pdf`);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Download error:', error);
      setMessage('Error downloading acknowledgment. Please try again.');
    }
  };
  
  // Update the button in the return statement
  return (
    <div className="registration-form">
      {!isLoggedIn ? (
        <>
          <h2>Login</h2>
          {message && <div className="message">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <i className="fas fa-user"></i>
              {errors.username && <div className="error-message">{errors.username}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock"></i>
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>

            <button type="submit">Login</button>
          </form>
          <div className="registration-link">
            Don't have an account? <a href="/register">Click here to register</a>
          </div>
        </>
      ) : (
        <div>
          <h2>Welcome {userData?.username}</h2>
          {loginSuccess && userData && (
            <button 
              onClick={() => handleDownloadAcknowledgment(userData.username)}
              className="btn btn-primary"
              style={{ margin: '10px 0' }}
            >
              Download Acknowledgment
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
