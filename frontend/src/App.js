import React from 'react';
import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/home/Home";
import Profile from './pages/profile/Profile';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Post from "./pages/post/Post";
import Favorite from './pages/favorite/Favorite';
import Setting from "./pages/setting/Setting";
import Friends from './pages/friends/Friends';
import AllPosts from './pages/allPosts/AllPosts';
import { AuthContext } from './state/AuthContext';


function App() {

  const { user } = useContext(AuthContext);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={user ? <Navigate to="/profile/setting/:username" /> : <Register />} />
          <Route path='/login' element={user ? <Navigate to={`/allPosts/${user.username}`} /> : <Login />} /> {/* After logged in, go to profile page */}
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/setting/:username' element={<Setting />} />
          <Route path='/friends/:username' element={<Friends />} />
          <Route path='/post' element={<Post />} />
          <Route path='/favorite/:username' element={<Favorite />} />
          <Route path='/allPosts/:username' element={<AllPosts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
