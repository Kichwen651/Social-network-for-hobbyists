import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // HomePage component
import ProfilePage from './pages/ProfilePage';  // ProfilePage component
import SearchPage from './pages/SearchPage';  // SearchPage component
import AboutPage from './pages/AboutPage';  // AboutPage component
import GroupPage from './pages/GroupPage';  // GroupPage component
import Header from './components/Header';  // Header component for navigation

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/group/:id" element={<GroupPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
