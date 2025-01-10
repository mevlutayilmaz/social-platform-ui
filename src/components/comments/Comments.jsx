import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { getComments, addComment, deleteComment } from "../../api/comments";
import Loading from "../loading/Loading";
import Error from "../error/Error";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { likeComment, undoLikeComment } from "../../api/likes";

const Comments = ({ postId }) => {
  const [content, setContent] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);

  const { isLoading, error, data } = useQuery({
    queryKey: [`comments/${postId}`],
    queryFn: async () => await getComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries([`comments/${postId}`]);
    },
  });

  const mutationLike = useMutation({
    mutationFn: async (comment) => comment.isLiked ? await undoLikeComment(comment.id) : await likeComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries([`comments/${postId}`]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries([`comments/${postId}`]);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ postId, content });
    setContent("");
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  const handleMenuToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  const handleLike = (comment) => {
    mutationLike.mutate(comment);
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePicture} alt="" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        data.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.user.profilePicture} alt="" />
            <div className="info">
              <div className="name-and-date">
                <span>{comment.user.nameSurname}</span>
                <span className="dot">·</span>
                <span className="date">
                  {moment(comment.createdDate).fromNow()}
                </span>
              </div>
              <p>{comment.content}</p>
            </div>
            <div className="date-container">
              <MoreHorizIcon
                onClick={() => handleMenuToggle(comment.id)}
                className="more-icon"
              />
              {openMenu === comment.id &&
                comment.user.username === currentUser.username && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                )}

              <div className="like-container">
                {comment.isLiked ? (
                  <FavoriteOutlinedIcon
                    style={{ color: "red" }}
                    onClick={() => handleLike(comment)}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    onClick={() => handleLike(comment)}
                  />
                )}
                <span>{comment.likeCount}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
