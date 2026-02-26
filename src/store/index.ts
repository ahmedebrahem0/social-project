// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import postsReducer from './slices/post.slice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
  // ✅ أضف الـ middleware ده
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;