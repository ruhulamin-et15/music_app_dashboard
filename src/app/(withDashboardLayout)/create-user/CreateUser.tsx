"use client";


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { useCreateUserMutation } from "@/Redux/Api/userApi";
import { toast, ToastContainer } from "react-toastify";
const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();



  // State for previewing selected image

  const [createUser, { isLoading }] = useCreateUserMutation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // Handle image preview
    const [preview, setPreview] = useState<string | null>(null);

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
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
        if (data.password !== data.confirmPassword) {
        
          toast.success("Passwords do not match")
          return;
        }
   
        const formData = new FormData();
          formData.append("userName",data.userName);
          formData.append("email",data.email)
          formData.append("password",data.password)
          formData.append("profileImage",data.profileImage[0])
          formData.append("subscriptions",JSON.parse(data.subscriptions))
          formData.append("gender",data.gender)
          
         
        

     const response = await createUser(formData).unwrap();
       if(response.success){
      
        toast.success("User Created Successfully");
        setPreview(null);
        reset()
       }
      } catch (error: any) {
       
        toast.error("Failed to create user");
      }
    };

  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <ToastContainer position="bottom-right"/>
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">User Name</label>
            <input
              type="text"
              {...register("userName", {
                required: "User  name is required",
              })}
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter User name"
            />
            {errors.userName && (
              <p className="text-red-300 text-sm">
                {errors?.userName?.message as string}
              </p>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <p className="text-red-300 text-sm">
                {errors?.email?.message as string}
              </p>
            )}
          </div>
          <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
         
            <input
              type={showPassword == true ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
              })}
              required
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-300 text-sm">
                {errors?.password?.message as string}
              </p>
            )}
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="text-xl"
                onClick={handleShowPassword}
              >
                {showPassword == false ? <IoEyeSharp /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          </div>
           <div>
          <label className="block text-sm font-medium">Confirm Password</label>
          <div className="relative">
         
            <input
              type={showPassword == true ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
              })}
              required
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter your Confirm Password"
            />
            {errors.password && (
              <p className="text-red-300 text-sm">
                {errors?.password?.message as string}
              </p>
            )}
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="text-xl"
                onClick={handleShowPassword}
              >
                {showPassword == false ? <IoEyeSharp /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          </div>
      
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
             
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {errors.gender && (
              <p className="text-red-300 text-sm">{errors.gender.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Subscription Plan</label>
            <select
              {...register("subscriptions", { required: "Subscription plan is required" })}
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
             
            >
              <option value="true">Paid</option>
              <option value="false">Unpaid</option>
            </select>
            {errors.subscriptions && (
              <p className="text-red-300 text-sm">{errors.subscriptions.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Profile Image</label>
            <input
              type="file"
              {...register("profileImage")}
              accept="image/*"
              className="mt-1 block w-full px-4 py-2 h-12 bg-black text-white border border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
              onChange={handleImageChange}
            />
            {errors.profileImage && (
              <p className="text-red-300 text-sm">
                {errors?.profileImage?.message as string}
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
          <div className="flex justify-between space-x-2">
            <button
              type="submit"
              className="flex-1 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition duration-300"
            >
              {isLoading ? (
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
                  Submitting...
                </>
              ) : (
                <>Submit</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
