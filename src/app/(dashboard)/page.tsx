// app/(dashboard)/page.tsx
import { Container, Typography } from "@mui/material";
import PostList from "@/features/posts/components/PostList";

export const metadata = {
  title: "Feed - Linked Posts",
  description: "Your social media feed",
};

export default function FeedPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Feed
      </Typography>
      <PostList />
    </Container>
  );
}