
import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const dashoboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getDashoboardOverView: build.query({
      query: () => ({
        url: `/admin/overview`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
    totalEarning: build.query({
      query: () => ({
        url: `/payment/total-earnings`,
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
   
  }),
});

export const {

  useGetDashoboardOverViewQuery,
  useTotalEarningQuery

} = dashoboardApi;
