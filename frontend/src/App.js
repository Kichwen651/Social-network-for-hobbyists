import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserContext } from './contexts/UserContextProvider'; // Import UserContext
import UserProvider from './contexts/UserContextProvider'; // Global state management
import {GroupProvider} from './contexts/GroupContextProvider'; // Import GroupContextProvider
import Header from './components/Header'; // Header component for navigation
import HomePage from './pages/HomePage'; // HomePage component
import ProfilePage from './pages/ProfilePage'; // ProfilePage component
import LoginPage from './pages/LoginPage'; // LoginPage component
import LogoutPage from './pages/LogoutPage'; // LogoutPage component
import EditProfilePage from './pages/EditProfilePage'; // EditProfilePage component
import SearchPage from './pages/SearchPage'; // SearchPage component
import GroupPage from './pages/GroupPage'; // GroupPage component
import AboutPage from './pages/AboutPage'; // AboutPage component
import SignupPage from './pages/SignupPage'; // SignupPage component

// A PrivateRoute component that redirects to login if user is not logged in
const PrivateRoute = ({ children }) => {
  const { currentUser } = React.useContext(UserContext); // Get current user from context

  if (!currentUser) {
    // Redirect to login page if the user is not logged in
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <UserProvider>
      <GroupProvider> {/* Wrap the app in GroupProvider */}
        <Router>
          {/* Header navigation component */}
          <Header />
          
          <div className="container mt-4">
            {/* Defining routes for the application */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} /> {/* Alias for Home */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Authenticated Routes (Protected) */}
              <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
              <Route path="/edit-profile" element={<PrivateRoute><EditProfilePage /></PrivateRoute>} />
              <Route path="/search" element={<PrivateRoute><SearchPage /></PrivateRoute>} />
              <Route path="/logout" element={<PrivateRoute><LogoutPage /></PrivateRoute>} />
              
              {/* Dynamic Group Route */}
              <Route path="/group/:groupId" element={<PrivateRoute><GroupPage /></PrivateRoute>} />
              
              {/* Catch-all Route for 404 */}
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to Home page if no match */}
            </Routes>
          </div>
        </Router>
      </GroupProvider> {/* End GroupProvider */}
    </UserProvider>
  );
};

export default App;
