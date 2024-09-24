import { useEffect, useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axiosInstance.get("/api/posts");
                setPosts(response.data);
                console.log(response.data);
            } catch (error) {
                console.log("Error PostList: ", error);
            }
        };

        fetchPosts();
    }, []);

    // // CreatePost Page로 이동
    // const handleGoCreatePost = () => {
    //     navigate(`/new-post`);
    // };
    //
    // // PostDetail로 이동
    // const handleGoPostDetail = (id) => {
    //     navigate(`/post/${id}`);
    // };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h2" gutterBottom>
                Posts
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate("/new-post")}>
                Post 작성
            </Button>
            {/*Grid는 deprecated 인데 어떤 걸 대신 써야하는지 모르겠음*/}
            <Grid container spacing={2}>
                {posts.map((post) => (
                    <Grid item xs={12} key={post.id}>
                        <Card onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer' }}>
                            <CardContent>
                                <Typography variant="h5" component="h3">
                                    {post.id}
                                </Typography>
                                <Typography variant="h5" component="h3">
                                    {post.author}
                                </Typography>
                                <Typography variant="h5" component="h3">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {post.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PostList;
