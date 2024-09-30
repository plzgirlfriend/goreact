import { useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import { Button, Container, TextField, Typography } from "@mui/material";

const UpdateComment = ({ postId, commentId, currentContent, onCancel}) => {
    const [content, setContent] = useState(currentContent);  // 초기 값을 전달받은 content로 설정

    const handleUpdateComment = async (e) => {
        e.preventDefault();

        await axiosInstance.put(`/api/update-comment/${postId}/${commentId}`, { content })
            .then(response => {

                 setContent(response.data.content);
                alert("댓글 수정 완료");
            })
            .catch(error => {
                alert("댓글 수정 실패");
                console.error("댓글 수정 실패: ", error);
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h5" gutterBottom>
                댓글 수정
            </Typography>
            <form onSubmit={handleUpdateComment}>
                <TextField
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    수정
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel} fullWidth>
                    취소
                </Button>
            </form>
        </Container>
    );
};

export default UpdateComment;
