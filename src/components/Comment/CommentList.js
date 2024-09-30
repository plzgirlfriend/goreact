import {useEffect, useState} from "react";
import {axiosInstance} from "../Config/axiosConfig";
import {Button, List, ListItem, ListItemText} from "@mui/material";
import UpdateComment from "./UpdateComment";
import DeleteComment from "./DeleteComment";

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    // 수정할 댓글 Id
    const [editCommentId, setEditCommentId] = useState(null);
    // 수정할 댓글 내용
    const [editContent, setEditContent] = useState('');

    // 댓글 목록 가져오기
    useEffect(() => {
        const fetchComments = async () => {
            await axiosInstance.get(`/api/posts/${postId}/comments`)  // URL 수정
                .then(response => {
                    setComments(response.data);
                })
                .catch(error => {
                    console.error("Error fetching comments: ", error);
                });
        };
        fetchComments();
    }, [postId]);

    const handleEdit = (id, content) => {
        setEditCommentId(id);
        setEditContent(content);
    };

    const handleDelete = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    return (
        <List>
            {comments.map(comment => (
                <ListItem key={comment.id} alignItems="flex-start">
                    {editCommentId === comment.id ? (
                        <UpdateComment
                            postId={postId}
                            commentId={editCommentId}
                            currentContent={editContent}
                            onCancel={() => setEditCommentId(null)}
                            onUpdate={(updatedComment) => {
                                setComments(comments.map(c => c.id === updatedComment.id ? updatedComment : c));
                                setEditCommentId(null);
                            }}
                        />
                    ) : (
                        <>
                            <ListItemText
                                primary={comment.author}
                                secondary={comment.content}
                            />
                            <Button onClick={() => handleEdit(comment.id, comment.content)}>수정</Button>
                            <DeleteComment commentId={comment.id} onDelete={handleDelete} />
                        </>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default CommentList;
