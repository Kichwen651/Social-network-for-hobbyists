import React from 'react';
import ReactDOM from 'react-dom/client';
import UserContextProvider from './contexts/UserContextProvider'; // Use default import for UserContextProvider
import App from './App'; // Main App component

// Create root element using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped with the UserProvider to manage user state globally
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
