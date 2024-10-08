/*

Backend dto: String title, String content

 */

import React from 'react';
import {useState} from 'react';
import {axiosInstance} from "../Config/axiosConfig";
import {Button, Container, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 작성 버튼
    const handleCreatePost = async () => {

        // try {
        //     // HTTP POST method, localhost:8080/api/post, dto: title, content
        //     const response = await axiosInstance.post('/api/post', {
        //         // dto
        //         title,
        //         content
        //     });
        //     // 전달 제대로 됐겠지?
        //     console.log(response.data);
        //
        // } catch (error){
        //
        //     console.log("Error CreatePost: ", error);
        // }

        // HTTP Post method, localhost:8080/api/post, dto: title, content
        await axiosInstance.post("/api/post", {
            title,
            content
        }).then(response => {

            alert(`게시글 작성 완료`);
            navigate(`/posts`);
            // 제대로 전달 되었겠지?
            console.log(response.data);

        }).catch(error => {
            console.error("게시글 생성 실패: ", error);
        });
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom>
                게시글 작성
            </Typography>
            <TextField
                label="제목"
                variant="outlined"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                label="내용"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleCreatePost}>
                Post 작성
            </Button>
        </Container>
    );
}

export default CreatePost;
