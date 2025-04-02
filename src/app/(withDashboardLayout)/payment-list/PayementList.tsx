"use client";
import React from "react";
import { useGetAllPaymentsQuery } from "@/Redux/Api/paymentApi";
import ClipLoader from "react-spinners/ClipLoader";

const PaymentList = () => {
  const { data, isLoading } = useGetAllPaymentsQuery(undefined);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader
          color={"#C11F94"}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4 sm:p-6">
      <div className="w-full max-w-4xl mx-auto bg-black text-white rounded-lg overflow-hidden shadow-lg">
        <table className="w-full border border-gray-700 text-left">
          {/* Table Head */}
          <thead>
            <tr className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white">
              <th className="px-4 sm:px-6 py-3">#</th>
              <th className="px-4 sm:px-6 py-3">User</th>
              <th className="px-4 sm:px-6 py-3">Email</th>
              <th className="px-4 sm:px-6 py-3">Plan Type</th>
              <th className="px-4 sm:px-6 py-3">Status</th>
              <th className="px-4 sm:px-6 py-3">Created At</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data?.result?.payments?.map((payment:any, index:number) => (
              <tr
                key={payment.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="px-4 sm:px-6 py-3">{index + 1}</td>
                <td className="px-4 sm:px-6 py-3">{payment?.user?.userName}</td>
                <td className="px-4 sm:px-6 py-3">{payment?.user?.email}</td>
                <td className="px-4 sm:px-6 py-3">{payment?.planType}</td>
                <td className="px-4 sm:px-6 py-3 text-green-400">{payment?.status}</td>
                <td className="px-4 sm:px-6 py-3">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Show message if no payments exist */}
        {data?.result?.payments?.length === 0 && (
          <div className="text-center text-gray-400 mt-4 py-4">No payments found.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentList;