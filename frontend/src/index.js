import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS globally
import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './contexts/UserContext'; // Correct import for UserContext
import App from './App'; // Main App component

// Create root element using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped with the UserProvider to manage user state globally
root.render(
  <UserProvider>
    <App />
  </UserProvider>
);
