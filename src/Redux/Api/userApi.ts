import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: any) => ({
      
        url: "/admin/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    createUser:build.mutation({
      query: (data: any) => ({
       
      
        url: "/admin/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    allUsers: build.query({
      query: (arg: any) => ({
        url: `/users`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),

    allCreators: build.query({
      query: (arg: any) => ({
        url: `/user/creator-user-all`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),

    userDelete: build.mutation({
      query: ( id : string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
  overrideExisting: true, // Ensures no conflict
});

export const {
  useLoginUserMutation,
  useAllCreatorsQuery,
  useAllUsersQuery,
  useUserDeleteMutation,
  useCreateUserMutation
} = userApi;
