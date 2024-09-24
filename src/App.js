import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from "./components/User/SignUp";
import PostList from "./components/Post/PostList";
import CreatePost from "./components/Post/CreatePost";
import Login from "./components/User/Login";
import PostDetail from "./components/Post/PostDetail";
import UpdatePost from "./components/Post/UpdatePost";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/" element={<SignUp />}/>
                <Route path="/posts" element={<PostList />}/>
                <Route path="/new-post" element={<CreatePost />}/>
                <Route path="/post/:id" element={<PostDetail />}/>
                <Route path="/post/update/:id" element={<UpdatePost />}/>
            </Routes>
        </Router>
    );
}

export default App;
