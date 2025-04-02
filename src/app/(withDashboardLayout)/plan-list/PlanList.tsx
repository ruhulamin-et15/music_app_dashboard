"use client";

import { useGetAllPlanQuery } from "@/Redux/Api/planApi";
import Link from "next/link";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const PlanList = () => {
  const { data, isLoading } = useGetAllPlanQuery("");

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader color={"#C11F94"} size={80} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="overflow-hidden rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white text-sm sm:text-base">
                <th className="px-4 sm:px-6 py-3">Plan Type</th>
                <th className="px-4 sm:px-6 py-3">Amount (USD)</th>
                <th className="px-4 sm:px-6 py-3">Description</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3">Currency</th>
                <th className="px-4 sm:px-6 py-3">Interval</th>
                <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data?.result?.map((plan: any) => (
                <tr key={plan.id} className="bg-black text-white border-b border-gray-700 text-xs sm:text-sm">
                  <td className="px-4 sm:px-6 py-3">{plan?.planType || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3">${plan?.amount || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3 whitespace-normal">{plan?.description || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3">{plan?.active ? "Active" : "Inactive"}</td>
                  <td className="px-4 sm:px-6 py-3">{plan?.currency}</td>
                  <td className="px-4 sm:px-6 py-3">{plan?.interval}</td>
                  <td className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <Link
                      href={`/update-plan/${plan.id}`}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#5B4BCD] text-white rounded-md hover:bg-[#4a3bb7] transition text-center"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Plans Found Message */}
      {data?.result?.length === 0 && (
        <div className="text-center text-gray-400 mt-4">No plans found.</div>
      )}
    </div>
  );
};

export default PlanList;
