import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/post',
                { title, content },
                {
                    // session 인증
                    withCredentials: true
                });

            setSuccessMessage('게시물이 성공적으로 작성되었습니다!');
            setErrorMessage('');
            setTitle('');
            setContent('');
        } catch (error) {
            setErrorMessage('게시물 작성에 실패했습니다');
            setSuccessMessage('');
            console.error(error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Create New Post
            </Typography>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <TextField
                label="title"
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="content"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </Box>
    );
};

export default CreatePost;
