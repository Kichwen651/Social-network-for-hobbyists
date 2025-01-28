// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProfilePage from './pages/ProfilePage';
// import GroupPage from './pages/GroupPage';
// import LoginPage from './pages/LoginPage';
// import Header from './components/Header';
// import { UserContext } from './contexts/UserContext';

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       <Router>
//         <Header />
//         <div className="container mt-4">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/profile" element={<ProfilePage />} />
//             <Route path="/group/:id" element={<GroupPage />} />
//             <Route path="/login" element={<LoginPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </UserContext.Provider>
//   );
// }

// export default App;
