    // src/constants/api-endpoints.ts

    /**
     * ملف مسؤول عن تعريف كل مسارات الـ API (endpoints) في مكان واحد.
     * 
     * الهدف:
     * - منع تكرار الـ strings في المشروع
     * - لو الـ backend غيّر route → نعدل هنا بس
     * - الكود يبقى مقروء وواضح
     */

    export const API_ENDPOINTS = {
    // ========================
    // Auth & Users
    // ========================
    AUTH: {
        SIGNUP: "/users/signup",
        SIGNIN: "/users/signin",
        CHANGE_PASSWORD: "/users/change-password",
    },

    USERS: {
        PROFILE: "/users/profile-data",
        UPLOAD_PHOTO: "/users/upload-photo",
    },

    // ========================
    // Posts
    // ========================
    POSTS: {
        BASE: "/posts",                // GET all posts | POST create post
        SINGLE: (id: string) => `/posts/${id}`,   // GET | PUT | DELETE post
        USER_POSTS: (userId: string) =>
        `/posts?userId=${userId}`,
    },

    // ========================
    // Comments
    // ========================
    COMMENTS: {
        BASE: "/comments",             // POST create comment
        POST_COMMENTS: (postId: string) =>
        `/comments?postId=${postId}`,
        SINGLE: (id: string) => `/comments/${id}`, // PUT | DELETE comment
    },
    } as const;
