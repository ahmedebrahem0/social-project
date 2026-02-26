// store/slices/posts.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllPosts } from "@/services/posts.service";
import type { PostsState,GetAllPostsApiResponse} from "@/types/post";
import toast from "react-hot-toast";


const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  paginationInfo: null,
  currentPage: 1,
  hasMore: true,
};


/**
 * Fetch all posts
 */
export const fetchPosts = createAsyncThunk<
  GetAllPostsApiResponse,
  { page?: number; limit?: number },
  { rejectValue: string }
>(
  "posts/fetchPosts",
  async ({ page = 1, limit = 50 }, { rejectWithValue }) => {
    try {
      return await getAllPosts(page, limit);
    } catch (err: any) {
      return rejectWithValue(err.message || "Failed to fetch posts");
    }
  }
);

 const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {

    resetPosts(state) {
      state.posts = [];
      state.currentPage = 1;
      state.hasMore = true;
      state.paginationInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<GetAllPostsApiResponse>) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.paginationInfo = action.payload.paginationInfo;
        state.currentPage = action.payload.paginationInfo.currentPage;
        state.hasMore = action.payload.paginationInfo.currentPage < action.payload.paginationInfo.numberOfPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        toast.error(state.error || "Failed to load posts");
      });
  },
});

export const { resetPosts } = postsSlice.actions;
export default postsSlice.reducer;