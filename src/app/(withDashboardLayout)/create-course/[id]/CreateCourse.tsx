"use client";

import { useCreateCourseMutation } from "@/Redux/Api/courseApi";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const CreateCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id: teacherId } = useParams();
  console.log(teacherId, "check id");

  // State for previewing selected image
  const [preview, setPreview] = useState<string | null>(null);
  const [createCourse,{isLoading}] = useCreateCourseMutation();

  // Handle image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("courseName", data.courseName);
      formData.append("about", data.about);

      formData.append("courseImage", data.courseImage[0]);


      const response = await createCourse({ teacherId, formData }).unwrap();

      if (response?.success) {
    
    
        toast.success("Course  Created Successfully")
        reset();
        setPreview(null);
      } else {
    
        toast.error("Failed to create course")
      }
    } catch (error:any) {
     
     
      toast.error(error?.data?.message )
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
         <ToastContainer position="bottom-right"/>
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Course</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium">Course Name</label>
            <input
              type="text"
              {...register("courseName", {
                required: "Course name is required",
              })}
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter course name"
            />
            {errors.courseName && (
              <p className="text-red-300 text-sm">
                {errors?.courseName?.message as string}
              </p>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium">About</label>
            <textarea
              {...register("about", { required: "About section is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Write about the course"
              rows={3}
            />
            {errors.about && (
              <p className="text-red-300 text-sm">
                {errors?.about?.message as string}
              </p>
            )}
          </div>

          {/* Course Image Upload */}
          <div>
            <label className="block text-sm font-medium">Course Image</label>
            <input
              type="file"
              {...register("courseImage", {
                required: "Course image is required",
              })}
              accept="image/*"
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              onChange={handleImageChange}
            />
            {errors.courseImage && (
              <p className="text-red-300 text-sm">
                {errors?.courseImage?.message as string}
              </p>
            )}

            {/* Image Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-full h-40 object-cover rounded-md border border-gray-500"
              />
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-between space-x-2">
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
                        </>:<>Submit</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
