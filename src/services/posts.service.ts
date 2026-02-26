// services/posts.service.ts
import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import type { GetAllPostsApiResponse } from "@/types/post";

/**
 * Get all posts with pagination
 */
export const getAllPosts = async (page: number = 1,limit: number = 50): Promise<GetAllPostsApiResponse> => {
  const response = await api.get<GetAllPostsApiResponse>(`${API_ENDPOINTS.POSTS.BASE}?page=${page}&limit=${limit}`
  );
  return response.data;
};