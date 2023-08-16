import { apiSlice } from "../../app/api/apiSlice";
import { IPost } from "../../interface/iPost";
// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
// const topicsAdapter = createEntityAdapter<Post>({
//   sortComparer: (a, b) => a.updatedAt.localeCompare(b.updatedAt), // Sort in ASC order based on updatedAt
// });
// const initialState = topicsAdapter.getInitialState();
export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
      providesTags: [{ type: "Post", id: "LIST" }],
    }),
    addNewPost: builder.mutation<IPost, IPost>({
      query: (post) => {
        return {
          url: "/posts",
          method: "POST",
          body: post,
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    updatePost: builder.mutation<IPost, IPost>({
      query: (post) => {
        console.log(post);
        return {
          url: `/posts/${post._id}`,
          method: "PUT",
          body: post,
        };
      },
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
    deletePost: builder.mutation<IPost, IPost>({
      query: ({ _id: postId }) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
        body: postId,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;

// export const selectTopicsResult = topicApiSlice.endpoints.getTopics.select();
