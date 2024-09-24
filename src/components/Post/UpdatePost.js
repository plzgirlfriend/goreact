import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import { Button, Container, TextField, Typography } from "@mui/material";

const UpdatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         try {
    //             const response = await axiosInstance.get(`/api/post/${id}`);
    //             setTitle(response.data.title);
    //             setContent(response.data.content);
    //         } catch (error) {
    //             console.log("Error fetching post: ", error);
    //         }
    //     };
    //
    //     fetchPost();
    // }, [id]);

    const handleUpdatePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put(`/api/update-post/${id}`, {
                    title, content
                });
            console.log("Post updated successfully", response.data);
            navigate(`/post/${id}`);
        } catch (error) {
            console.log("Error updating post: ", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">Update Post</Typography>
            <form onSubmit={handleUpdatePost}>
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Content"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Post
                </Button>
            </form>
        </Container>
    );
};

export default UpdatePost;
