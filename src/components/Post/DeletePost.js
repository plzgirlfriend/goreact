// delete는 그냥 흠.. Button만 있으면 되는 거 아닌가?
// PostDetail에서 본인이면 삭제 가능하도록..

import {axiosInstance} from "../Config/axiosConfig";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeletePost = ({postId, onDelete}) => {

    const handleOnDelete = async () => {

        await axiosInstance.delete(`/api/delete-post/${postId}`)
            .then(() => {

                onDelete(postId);
                alert(`게시글 삭제 성공`);
                console.log(postId);
            })
            .catch(error => {

                alert(`게시글 삭제 실패`);
                console.log("Error DeletePost: ", error);
            });
    }

    return (
        // mui DeleteButton
        <IconButton variant="contained" color="error" onClick={handleOnDelete} aria-label="delete">
            <DeleteIcon />
        </IconButton>
    );
}

export default DeletePost;