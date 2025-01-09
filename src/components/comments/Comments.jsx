import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { getComments, addComment, deleteComment } from "../../api/comments"
import Loading from "../loading/Loading";
import Error from "../error/Error";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const Comments = ({ postId }) => {
  const [content, setContent] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => await getComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ postId, content });
    setContent("");
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? <Error />
        : isLoading
        ? <Loading />
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.user.profilePicture} alt="" />
              <div className="info">
                <span>{comment.user.nameSurname}</span>
                <p>{comment.content}</p>
              </div>
              <div className="date-container">
                <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} className="more-icon" />
                {menuOpen && comment.user.username === currentUser.username && (
                  <button onClick={() => handleDelete(comment.id)} className="delete-button">delete</button>
                )}
                <span className="date">{moment(comment.createdDate).fromNow()}</span>
              </div>
            </div>
          ))}
    </div>
    
  );
};

export default Comments;
