import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../api/posts"
import { useState } from "react";
import Error from "../error/Error";
import Loading from "../loading/Loading";

const Posts = ({ username = null }) => {
  const [pageCount, setPageCount] = useState(1);
  const [itemCount, setItemCount] = useState(20);

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getAllPosts(pageCount, itemCount, username),
  });

  return (
    <div className="posts">
      {error
        ? <Error />
        : isLoading
        ? <Loading />
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
