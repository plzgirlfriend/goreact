/*

Backend dto: Long id, String title, String content

*/
import { useParams } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import { Button, Container, TextField, Typography } from "@mui/material";

const UpdatePost = () => {
    const { id } = useParams();

    // const navigate = useNavigate();

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

        // try {
        //     const response = await axiosInstance.put(`/api/update-post/${id}`, {
        //             title, content
        //         });
        //     console.log("Post updated successfully", response.data);
        //     navigate(`/post/${id}`);
        // } catch (error) {
        //     console.log("Error updating post: ", error);
        // }

        await axiosInstance.put(`/api/update-post/${id}`,{
            title,
            content
        })
            .then(response => {

                setTitle(response.data.title);
                setContent(response.data.content);

                alert(`수정 완료`);
                console.log("수정 성공: ", response.data);
            })
            .catch(error => {

                alert(`수정 실패`);
                console.log("수정 실패: ", error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4">게시글 수정</Typography>
            <form onSubmit={handleUpdatePost}>
                <TextField
                    label="제목"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="내용"
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
