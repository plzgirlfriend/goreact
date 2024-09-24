import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../Config/axiosConfig";
import { Button, Container, Typography } from "@mui/material";
import DeletePost from "./DeletePost";

const PostDetail = () => {
    // get url id
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    // 게시글 내용 가져오기
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const postResponse = await axiosInstance.get(`/api/post/${id}`);
                setTitle(postResponse.data.title);
                setAuthor(postResponse.data.author.username);
                setContent(postResponse.data.content);
            } catch (error) {
                console.log("Error fetching post data: ", error);
            }
        };

        fetchPostData();
    }, [id]);

    return (
        <Container>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1">{content}</Typography>
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
        </Container>
    );
};

export default PostDetail;
