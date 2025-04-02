"use client";
import { useCreateTeacherMutation } from "@/Redux/Api/teacherApi";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const CreateTeacher = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      
      formData.append("teacherName", data.teacherName);
      formData.append("designation", data.designation);
      formData.append("email", data.email);
      formData.append("about", data.about);
      formData.append("profileImage", data.profileImage[0]);

      const response = await createTeacher(formData).unwrap();
      console.log(response, "check response");
      
      if (response?.success) {
      
        toast.success("Teacher Created Successfully")
        reset(); 
        setImagePreview(null); 
      } else {
        
        toast.error("Failed to create teacher")
      }
    } catch (error: any) {
    

      toast.error(error?.data?.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
          <ToastContainer position="bottom-right"/>
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Teacher</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium">Teacher Name</label>
            <input
              type="text"
              {...register("teacherName", { required: "Teacher name is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter teacher name"
            />
            {errors.teacherName && <p className="text-red-300 text-sm">{errors?.teacherName?.message as string }</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Designation</label>
            <input
              type="text"
              {...register("designation", { required: "Designation is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter designation"
            />
            {errors.designation && <p className="text-red-300 text-sm">{errors?.designation?.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
              })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter email"
            />
            {errors.email && <p className="text-red-300 text-sm">{errors?.email?.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">About</label>
            <textarea
              {...register("about", { required: "About section is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Write about the teacher"
              rows={3}
            />
            {errors.about && <p className="text-red-300 text-sm">{errors?.about?.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            <input
              type="file"
              {...register("profileImage", { required: "Profile image is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              accept="image/*"
              onChange={handleImageChange}
            />
            {errors.profileImage && <p className="text-red-300 text-sm">{errors?.profileImage?.message as string}</p>}
          </div>

          {imagePreview && (
            <div className="mt-4 text-center">
              <p className="text-sm">Image Preview:</p>
              <img src={imagePreview} alt="Preview" className="w-32 h-32 mx-auto rounded-md" />
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold rounded-md transition duration-300 ${
              isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-gray-300"
            }`}
            disabled={isLoading}
          >
            {isLoading ?  <>
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

export default CreateTeacher;
