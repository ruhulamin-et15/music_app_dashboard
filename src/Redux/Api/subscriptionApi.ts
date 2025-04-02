import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const subscription = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubscription: build.mutation({
      query: (data: any) => {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
    }),
    deleteSubscription: build.mutation({
      query: () => {
        return {
          url: "",
          method: "DELETE",
        };
      },
    }),
    updateSubscription: build.mutation({
      query: ({ updateData: data, id }) => {
        return {
          url: `/subscription-plan/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.subscription],
    }),
    getAllSubscription: build.query({
      query: () => ({
        url: "/subscription-plan/all",
        method: "GET",
      }),
      providesTags: [tagTypes.subscription],
    }),
    getSubscriptionById: build.query({
      query: (id) => ({
        url: `/subscription-plan/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  useGetAllSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useGetSubscriptionByIdQuery,
} = subscription;
