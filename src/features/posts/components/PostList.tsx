// features/posts/components/PostList.tsx
"use client";

import { Box, CircularProgress, Typography, Button } from "@mui/material";
import PostCard from "./PostCard";
import { usePosts } from "../hooks/usePosts";

export default function PostList() {
  const { posts, isLoading, error, hasMore, loadMore } = usePosts();

  if (isLoading && posts.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!isLoading && posts.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h6" color="text.secondary">
          No posts yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {/* Load More Button */}
      {hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 3 }}>
          <Button
            variant="outlined"
            onClick={loadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </Box>
  );
}