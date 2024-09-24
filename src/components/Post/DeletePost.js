// delete는 그냥 흠.. Button만 있으면 되는 거 아닌가?
// PostDetail에서 본인이면 삭제 가능하도록..

import {axiosInstance} from "../Config/axiosConfig";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const DeletePost = ({postId, onDelete}) => {

    const handleOnDelete = async () => {

        // HTTP DELETE method, localhost:8080/api/delete-post/${postId}
        await axiosInstance.delete(`/api/delete-post/${postId}`)
            .then(() => {

                onDelete(postId);
                alert(`Delete Success: ${postId}`);
                console.log(postId);
            })
            .catch(error => {

                console.log("Error DeletePost: ", error);
            });
    }

    return (
        <IconButton onClick={handleOnDelete} color="error" aria-label="delete">
            <DeleteIcon />
        </IconButton>
    );
}

export default DeletePost;