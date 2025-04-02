"use client";
import { useCreateClassMutation } from "@/Redux/Api/courseApi";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const CreateClass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [classCreate, { isLoading }] = useCreateClassMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const teacherId = searchParams.get("teacherId");
  const pathSegments = pathname.split("/");
  const coursesId = pathSegments[pathSegments.length - 1]?.split("=")[1];

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "image") setImagePreview(reader.result as string);
        if (type === "video") setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("className", data.className);
      formData.append("summary", data.summary);
      formData.append("classNo", data.classNo);
      formData.append("courseId", coursesId);

      const thumbnailFile = watch("thumbnail")?.[0];
      const videoFile = watch("video")?.[0];

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      if (videoFile) {
        formData.append("classVideo", videoFile);
      }

      const response = await classCreate({ teacherId, formData }).unwrap();

      if (response?.success) {
    
        toast.success("Class Created Successfully")
        reset();
        setImagePreview(null);
        setVideoPreview(null);
      } else {
        toast.error("Failed to create class")
       
      }
    } catch (error: any) {
      toast.error(error?.data?.message)

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
                <ToastContainer position="bottom-right"/>
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create Class</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-sm font-medium">Class Name</label>
            <input
              type="text"
              {...register("className", { required: "Class name is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter class name"
            />
            {errors?.className && (
              <p className="text-red-300 text-sm">
                {errors?.className?.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Summary</label>
            <textarea
              {...register("summary", { required: "Summary is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter class summary"
              rows={3}
            />
            {errors?.summary && (
              <p className="text-red-300 text-sm">
                {errors?.summary?.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Class No</label>
            <input
              type="number"
              {...register("classNo", { required: "Class number is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter class number"
            />
            {errors.classNo && (
              <p className="text-red-300 text-sm">
                {errors?.classNo?.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Class Thumbnail</label>
            <input
              type="file"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
            />
            {errors.thumbnail && (
              <p className="text-red-300 text-sm">
                {errors?.thumbnail?.message as string}
              </p>
            )}
          </div>

          {imagePreview && (
            <div className="mt-4 text-center">
              <p className="text-sm">Thumbnail Preview:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 mx-auto rounded-md"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Class Video</label>
            <input
              type="file"
              {...register("video", { required: "Video is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              accept="video/*"
              onChange={(e) => handleFileChange(e, "video")}
            />
            {errors.video && (
              <p className="text-red-300 text-sm">
                {errors?.video?.message as string}
              </p>
            )}
          </div>

          {videoPreview && (
            <div className="mt-4 text-center">
              <p className="text-sm">Video Preview:</p>
              <video controls className="w-64 mx-auto rounded-md">
                <source src={videoPreview} type="video/mp4" />
              </video>
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold rounded-md transition duration-300 ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-300"
            }`}
            disabled={isLoading}
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
                        </>:<>Submit</>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;
