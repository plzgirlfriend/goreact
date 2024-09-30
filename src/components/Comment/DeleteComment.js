import {axiosInstance} from "../Config/axiosConfig";
import {Button} from "@mui/material";

const DeleteComment = ({commentId, onDelete}) => {

    const handleDeleteComment = async () => {

        await axiosInstance.delete(`/api/delete-comment/${commentId}`)
            .then(() => {

                // 댓글 삭제
                onDelete(commentId);
                alert(`댓글 삭제 성공`);
                console.log(`${commentId} 댓글 삭제 성공`);
            })
            .catch(error => {

                alert(`댓글 삭제 실패`);
                console.log(`댓글 삭제 실패: `, error);
            })
    }

    return (
        <Button variant="contained" color="secondary" onClick={handleDeleteComment}>
            삭제
        </Button>
    );
}

export default DeleteComment;