import React, { useState } from 'react';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Assuming this is your login function in the API service
import { setAuthToken } from '../utils/auth'; // Import the setAuthToken function
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContextProvider'; // Import UserContext

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();
  const { login: loginContext } = useContext(UserContext); // Get login function from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    setLoading(true); // Set loading state

    if (!email || !password) {
      setError('Both email and password are required.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const userData = await login(email, password); // Call the login function from your API service
      setAuthToken(userData.token); // Store the token in localStorage
      loginContext(userData); // Set the user in the context to indicate successful login

      // Redirect to profile page if login is successful
      navigate('/profile'); // You can change this to `/home` or any page you prefer
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login</h2>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    disabled={loading}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
