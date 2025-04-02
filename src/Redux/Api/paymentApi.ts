import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPayments: build.query({
      query: () => ({
        url: `/payment/payments`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    
  }),
});

export const {  useGetAllPaymentsQuery } = paymentApi;
