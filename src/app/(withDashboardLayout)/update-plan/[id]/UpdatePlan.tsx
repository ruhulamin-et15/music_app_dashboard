"use client";
import {
  useGetPlanByIdQuery,
  useUpdatePlanMutation,
} from "@/Redux/Api/planApi";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const UpdatePlan = () => {
  const { id: planId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updatePlan, { isLoading: updateLoading }] = useUpdatePlanMutation();
  const { data: singlePlan, isLoading } = useGetPlanByIdQuery(planId);

  const onSubmit = async (data: any) => {
    try {
      const formattedData = {
        planType: data.planType,
        active: JSON.parse(data.active),
        description: data.description,
      };



      const response = await updatePlan({
        planId,
        formattedData,
      }).unwrap();

  

      if (response?.success) {
        toast.success("Plan Updated Successfully");
      } else {
        toast.error("Failed to update plan");
      }
    } catch (error) {
      toast.error("An error occurred while updating the plan");
    }
  };

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
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Plan</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Plan Type</label>
            <input
              type="text"
              defaultValue={singlePlan?.result?.planType}
              {...register("planType", { required: "Plan type is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md"
              placeholder="Enter plan type"
            />
            {errors.planType && (
              <p className="text-red-300 text-sm">
                {errors.planType.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Active</label>
            <select
              {...register("active", { required: "Active status is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md"
              defaultValue={singlePlan?.result?.active ? "true" : "false"}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
            {errors.active && (
              <p className="text-red-300 text-sm">
                {errors.active.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              defaultValue={singlePlan?.result?.description}
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md"
              placeholder="Enter description"
              rows={3}
            />
            {errors.description && (
              <p className="text-red-300 text-sm">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold rounded-md transition ${
              updateLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-300"
            }`}
            disabled={updateLoading}
          >
            {updateLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 inline mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Updating...
              </>
            ) : (
              <>Update</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlan;
