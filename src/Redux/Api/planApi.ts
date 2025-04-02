import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const planApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPlan: build.query({
      query: () => ({
        url: `/payment/stripe-plans`,
        method: "GET",
      }),
      providesTags: [tagTypes.plan],
    }),
    getPlanById: build.query({
      query: (planId) => {
        return {
          url: `/payment/stripe-plan/${planId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.plan],
    }),
    createPlan: build.mutation({
      query: (data) => ({
        url: `/payment/create/stripe-plan`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.plan],
    }),
    updatePlan: build.mutation({
      query: ({planId,formattedData}) => ({
        
        url: `/payment/update-plan/${planId}`,
        method: "PATCH",
        body: formattedData,
      }),
      invalidatesTags: [tagTypes.plan],
    }),
  }),
});

export const { useCreatePlanMutation, useGetAllPlanQuery,useUpdatePlanMutation,useGetPlanByIdQuery } = planApi;
