// features/posts/hooks/usePosts.ts
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts } from "@/store/slices/posts.slice";

export function usePosts(page: number = 1, limit: number = 50) {
  const dispatch = useAppDispatch();
  const { Posts, isLoading, error, paginationInfo, hasMore } = useAppSelector(
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
    Posts,
    isLoading,
    error,
    paginationInfo,
    hasMore,
    loadMore,
  };
}