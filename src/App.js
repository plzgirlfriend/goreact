import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./components/User/SignUp";
import PostList from "./components/Post/PostList";
import CreatePost from "./components/Post/CreatePost";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/login" element={<Login />}/>
            <Route path="/" element={<SignUp />}/>
            <Route path="/users" element={<UserList />}/>
            <Route path="/posts" element={<PostList />}/>
            <Route path="/new-post" element={<CreatePost />}/>
        </Routes>
      </Router>
  );
}

export default App;
