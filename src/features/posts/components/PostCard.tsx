// features/posts/components/PostCard.tsx
import { Card, CardContent, CardMedia, Avatar, Typography, Box } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import type { Posts } from "@/types/post";

interface PostCardProps {
  post: Posts;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card sx={{ mb: 2, borderRadius: 2 }}>
      {/* Header: User info */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={post.user.photo}
          alt={post.user.name}
          sx={{ width: 48, height: 48 }}
        >
          {post.user.name[0]}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {post.user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </Typography>
        </Box>
      </Box>

      {/* Post content */}
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
          {post.body}
        </Typography>
      </CardContent>

      {/* Post image */}
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          alt="Post image"
          sx={{
            maxHeight: 500,
            objectFit: "cover",
          }}
        />
      )}

      {/* Comments count */}
      {post.comments && post.comments.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Typography variant="body2" color="text.secondary">
            {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
          </Typography>
        </Box>
      )}
    </Card>
  );
}