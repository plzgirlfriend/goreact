import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../Config/axiosConfig";
import { Button, Container, Typography } from "@mui/material";
import DeletePost from "./DeletePost";
import CommentList from "../Comment/CommentList";
import AddComment from "../Comment/AddComment";

const PostDetail = () => {

    const { id } = useParams();
    
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        const renderPostDetail = async () => {
            await axiosInstance.get(`/api/post/${id}`)
                .then(response => {
                    setTitle(response.data.title);
                    setAuthor(response.data.author);
                    setContent(response.data.content);
                })
                .catch(error => {
                    alert(`게시글 세부 조회 실패 ㅠㅠ`);
                    console.error("Error PostDetail: ", error);
                });
        };

        renderPostDetail();
    }, [id]);

    // const handleCommentAdded = (newComment) => {
    //     console.log("새 댓글 추가:", newComment);
    // };

    return (
        <Container>
            <Typography variant="subtitle1" color="textSecondary">
                작성자: {author}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                제목: {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
                내용: {content}
            </Typography>

            <Button variant="contained" onClick={() => navigate(`/post/update/${id}`)}>
                수정
            </Button>
            <DeletePost postId={id} onDelete={() => navigate("/posts")} />

            <CommentList postId={id} />

            <AddComment postId={id} />
        </Container>
    );
};

export default PostDetail;
