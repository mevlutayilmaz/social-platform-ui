import Post from "../post/Post";
import "./posts.scss";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../api/posts";
import { useState, useRef, useCallback } from "react";
import Error from "../error/Error";
import Loading from "../loading/Loading";

const Posts = ({ username = null }) => {
  const [itemCount] = useState(10);
  const observer = useRef();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts", username],
    queryFn: ({ pageParam = 1 }) =>
      getAllPosts(pageParam, itemCount, username),
    getNextPageParam: (lastPage, allPages) => {
        if (lastPage.length < itemCount) {
            return undefined;
          }
        return allPages.length + 1;
    },
  });


  const lastPostRef = useCallback(node => {
    if(isLoading || isFetchingNextPage) return;
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting && hasNextPage){
            fetchNextPage();
        }
    })
    if(node) observer.current.observe(node)
}, [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage])



  return (
    <div className="posts">
      {error ? (
        <Error />
      ) : isLoading ? (
        <Loading />
      ) : (
        data?.pages?.map((page) =>
          page.map((post, index) => {
            if(page.length === index + 1){
               return <Post post={post} key={post.id} ref={lastPostRef} />;
            }else {
              return <Post post={post} key={post.id} />;
            }
          })
        )
      )}
      {isFetchingNextPage && <Loading />}
    </div>
  );
};

export default Posts;