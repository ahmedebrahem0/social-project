
export interface Comments{
    _id: string,
    content: string,
    commentCreator: User,
    post: string,
    createdAt:string,
}

export interface User {
        _id: string,
        name: string,
        photo?: string
}

export interface Posts {
    _id: string,
    body: string,
    image?: string,
    user: User,
    createdAt: string,
    comments: Comments[],
    id:string,
}
export interface PaginationInfo {
    currentPage: number,
    numberOfPages: number,
    limit: number,
    nextPage: number | null,
    total: number,
}

export interface GetAllPostsApiResponse {
    message: string,
    paginationInfo: PaginationInfo,
    posts:Posts[ ]
}
export interface PostsState {
  posts: Posts[];
  isLoading: boolean;
  error: string | null;
  paginationInfo: PaginationInfo | null;
  currentPage: number;
  hasMore: boolean;
}