// features/posts/hooks/usePosts.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/slices/post.slice";

export function usePosts(page: number = 1, limit: number = 50) {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error, paginationInfo, hasMore } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(fetchPosts({ page, limit }));
  }, [dispatch, page, limit]);

  const loadMore = () => {
    if (hasMore && !isLoading && paginationInfo) {
      dispatch(fetchPosts({ page: paginationInfo.currentPage + 1, limit }));
    }
  };

  return {
    posts,
    isLoading,
    error,
    paginationInfo,
    hasMore,
    loadMore,
  };
}