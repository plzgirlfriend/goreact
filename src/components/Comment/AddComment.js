import { useState } from "react";
import { axiosInstance } from "../Config/axiosConfig";
import { TextField, Button } from "@mui/material";

const AddComment = ({ postId }) => {
    const [commentContent, setCommentContent] = useState("");

    const handleAddComment = () => {
        axiosInstance.post(`/api/comment/${postId}`, {
            content: commentContent
        })
            .then(response => {
                // onCommentAdded(response.data);
                setCommentContent("");
                alert("댓글 작성 성공");
            })
            .catch(error => {
                console.error("댓글 작성 실패: ", error);
            });
    };

    return (
        <div>
            <TextField
                label="댓글 작성"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
            />
            <Button variant="contained" onClick={handleAddComment}>
                댓글 작성
            </Button>
        </div>
    );
};

export default AddComment;
