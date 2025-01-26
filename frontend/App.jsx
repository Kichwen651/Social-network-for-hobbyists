
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./src/components/Layout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NoPage from "./pages/NoPage"
import Profile from "./pages/Profile"
import SingleTodo from "./pages/SingleTodo"
import { UserProvider } from './src/context/UserContext';
import { TodoProvider } from './src/context/TodoContext';
import AddTodo from './pages/AddTodo';


function App() {

  return (
    <BrowserRouter>

     <UserProvider>
      <TodoProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="addtodo" element={<AddTodo />} />
          <Route path="todo/:id" element={<SingleTodo />} />

          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>

      </TodoProvider>
     </UserProvider>
     
    </BrowserRouter>
  )
}

export default App
