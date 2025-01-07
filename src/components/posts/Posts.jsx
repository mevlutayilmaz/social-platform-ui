import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../api/posts"
import { useState } from "react";

const Posts = () => {
  const [pageCount, setPageCount] = useState(1);
  const [itemCount, setItemCount] = useState(5);
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", pageCount, itemCount],
    queryFn: getAllPosts,
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
