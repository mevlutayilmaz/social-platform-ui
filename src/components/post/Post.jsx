import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import AuthService from "../../services/AuthService";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  // const { isLoading, error, data } = useQuery(["likes", post.id], () =>
  //   makeRequest.get("/likes?postId=" + post.id).then((res) => {
  //     return res.data;
  //   })
  // );

  const queryClient = useQueryClient();

  // const mutation = useMutation(
  //   (liked) => {
  //     if (liked) return makeRequest.delete("/likes?postId=" + post.id);
  //     return makeRequest.post("/likes", { postId: post.id });
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["likes"]);
  //     },
  //   }
  // );
  // const deleteMutation = useMutation(
  //   (postId) => {
  //     return makeRequest.delete("/posts/" + postId);
  //   },
  //   {
  //     onSuccess: () => {
  //       // Invalidate and refetch
  //       queryClient.invalidateQueries(["posts"]);
  //     },
  //   }
  // );

  const handleLike = () => {
    // mutation.mutate(data.includes(currentUser.id));
  };

  const handleDelete = () => {
    // deleteMutation.mutate(post.id);
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
              >
                <span className="name">{post.user.nameSurname}</span>
              </Link>
              <span className="date">{moment(post.createdDate).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.user.username === AuthService.getUsername() && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.content}</p>
          {post.mediaUrl && <img src={post.mediaUrl} alt="Post Media" />}
        </div>
        <div className="info">
          <div className="item">
            {/* {isLoading ? (
              "loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )} */}
              <FavoriteBorderOutlinedIcon onClick={handleLike} />

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
