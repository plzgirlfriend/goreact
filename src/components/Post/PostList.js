import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Alert, Box, Button, Card, CardContent, CircularProgress, List, ListItem, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


        // async/await, axios로 비동기, /api/posts 호출
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/posts', {
                withCredentials: true
            });
            
            // response로 post 설정
            setPosts(response.data);

            setLoading(false);

            // errorMessage 비우기
            setErrorMessage('');
        } catch (error) {

            setErrorMessage('Failed to load posts');

            setLoading(false);

            console.error(error);
        }
    };

    useEffect(() => {
        fetchPosts();
        // , [fetchPosts()] 하게 되면 계속 해서 relendering 하네..?
        // },[fetchPosts()])
    }, [])

    // loading 중일 떄
    if (loading) {
        // return <div>Loading...</div>;
        <CircularProgress/>
    }

    if (errorMessage) {
        // return <div>{errorMessage}</div>;
        return <Alert severity="error">{errorMessage}</Alert>;
    }

    return (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                PostList
            </Typography>
            {/*CreatePost.js button*/}
            <Button variant="contained" color="primary" onClick={() => navigate('/new-post')}>
                Create Post
            </Button>
            <List>
                {posts.map(post => (
                    <ListItem key={post.postId} disablePadding>
                        <Card variant="outlined" sx={{ width: '100%', mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {post.content}
                                </Typography>
                                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 1 }}>
                                    Author: {post.author}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
//     return (
//         <div>
//             <h2>All Posts</h2>
//             <ul>
//                 {posts.map(post => (
//                     // data type이 안 맞아서 warning이 발생하는 건가?
//                     <li key={post.postId}>
//                         <h3>{post.title}</h3>
//                         <p>{post.content}</p>
//                         <small>Author: {post.author}</small>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

export default PostList;
