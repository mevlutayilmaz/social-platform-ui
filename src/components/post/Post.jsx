import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { likePost, undoLikePost } from"../../api/likes"
import { deletePost } from "../../api/posts";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (isLiked) => isLiked ? await undoLikePost(post.id) : await likePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  const handleLike = () => {
    mutation.mutate(post.isLiked);
  };

  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.user.profilePicture} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.user.username}`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <span className="name">{post.user.nameSurname}</span>
              </Link>
              <span className="date">{moment(post.createdDate).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} cursor="pointer" />
          {menuOpen && post.user.username === currentUser.username && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.content}</p>
          {post.mediaUrl && <img src={post.mediaUrl} alt="Post Media" />}
        </div>
        <div className="info">
          <div className="item">
            {post.isLiked ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {post.likeCount} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            See Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
