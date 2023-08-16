import { apiSlice } from "../../app/api/apiSlice";
// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { Topic } from "../../interface/ITopic";
// const topicsAdapter = createEntityAdapter<Topic>({
//   sortComparer: (a, b) => a.updatedAt.localeCompare(b.updatedAt), // Sort in ASC order based on updatedAt
// });
// const initialState = topicsAdapter.getInitialState();
export const topicApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTopics: builder.query<Topic[], void>({
      query: () => "/topics",
      providesTags: [{ type: "Topic", id: "LIST" }],
    }),
    addNewTopic: builder.mutation<Topic, Topic>({
      query: (topic) => ({
        url: "/topics",
        method: "POST",
        body: topic,
      }),
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),
    updateTopic: builder.mutation<Topic, Topic>({
      query: (topic) => {
        console.log(topic);
        return {
          url: `/topics/${topic._id}`,
          method: "PUT",
          body: topic,
        };
      },
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),
    deleteTopic: builder.mutation<Topic, Topic>({
      query: ({ _id: topicId }) => ({
        url: `/topics/${topicId}`,
        method: "DELETE",
        body: topicId,
      }),
      invalidatesTags: [{ type: "Topic", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useAddNewTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicApiSlice;

// export const selectTopicsResult = topicApiSlice.endpoints.getTopics.select();
