"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { useCreatePlanMutation } from "@/Redux/Api/planApi";
import { toast, ToastContainer } from "react-toastify";

const CreatePlan = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const [createPlan,{isLoading}]=useCreatePlanMutation()
  const onSubmit = async (data:any) => {
    try {

  
   const formattedData = {
    ...data,
    amount: parseInt(data?.amount), 
  };

      const response = await createPlan(formattedData).unwrap();
      if (response?.success) {
   
        toast.success( "Plan  Created Successfully")
        reset();
 
      } else {
       
        toast.error( "failed to create plan")
      }
    } catch (error:any) {
  
      toast.error(  error.data.message )
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
        <ToastContainer position="bottom-right"/>
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Plan</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Plan Type */}
          <div>
            <label className="block text-sm font-medium">Plan Type</label>
            <input
              type="text"
              {...register("planType", { required: "Plan type is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter plan type"
            />
            {errors.planType && <p className="text-red-300 text-sm">{errors?.planType?.message as string }</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium">Amount ($)</label>
            <input
              type="number"
              {...register("amount", { required: "Amount is required", min: 1 })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter amount"
            />
            {errors.amount && <p className="text-red-300 text-sm">{errors?.amount?.message as string}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Write a short description"
              rows={3}
            />
            {errors.description && <p className="text-red-300 text-sm">{errors.description.message as string}</p>}
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium">Currency</label>
            <select
              {...register("currency", { required: "Currency is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="gbp">GBP</option>
            </select>
            {errors.currency && <p className="text-red-300 text-sm">{errors?.currency?.message as string}</p>}
          </div>

          {/* Interval */}
          <div>
            <label className="block text-sm font-medium">Interval</label>
            <select
              {...register("interval", { required: "Interval is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            >
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
            {errors.interval && <p className="text-red-300 text-sm">{errors?.interval?.message as string}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
          <button
              type="submit"
              className="flex-1 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition duration-300"
            >
                    { isLoading ?  <>
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
                          Submitting...
                        </>:<>Create Plan</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
