import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import AddBlog from './components/AddBlog';
import AdminMenu from './components/AdminMenu';
import LoggedMenu from './components/LoggedMenu';
import UnloggedMenu from './components/UnloggedMenu';
import { ImageContext } from './contexts/ImageContext';
import { MenuContext } from './contexts/MenuContext';
import AddService from './pages/addService/AddService';
import AdminBlogs from './pages/Admin/AdminBlogs';
import AdminHome from './pages/Admin/AdminHome';
import AdminPosts from './pages/Admin/AdminPosts';
import Blog from './pages/Blog/Blog';
import Categoryes from './pages/Categoryes/Categoryes';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Index from './pages/index/Index';
import MyPosts from './pages/MyPosts/MyPosts';
import Profile from './pages/profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  const [menu, setMenu] = useState(() => {
    const type = localStorage.getItem("menuType");
    return type || "";
  });

  const [images, setImages] = useState('');
  
  return (
    <div className="App">
      <MenuContext.Provider value={{ menu, setMenu }}>
      <ImageContext.Provider value={{images, setImages}}>

           {menu === "true" ? <LoggedMenu/> : "" }
           {menu === "false" ? <UnloggedMenu/> : "" }
           {menu === "admin" ? <AdminMenu/> : "" }
            
        <Routes>
          <Route path="/" element={isLoggedIn === "true" ? <Profile/> : <Index/>} />
          <Route path="/SignIn" element={<SignIn/>} />
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/Admin" element={<AdminHome/>} />
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/AddService" element={<AddService/>} />
          <Route path="/MyPosts" element={<MyPosts/>} />
          <Route path="/Categotyes" element={<Categoryes/>} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />
          <Route path="/Blog" element={<Blog/>} />
          <Route path="/AddBlog" element={<AddBlog/>} />
          <Route path="/AdminBlogs" element={<AdminBlogs/>} />
          <Route path="/AdminPosts" element={<AdminPosts/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
      </Routes>

      </ImageContext.Provider>
      </MenuContext.Provider>
    </div>
  );
}

export default App;
