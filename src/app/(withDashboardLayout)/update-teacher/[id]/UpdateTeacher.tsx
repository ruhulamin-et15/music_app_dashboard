"use client";
import { useGetTeacherByIdQuery, useUpdateTeacherMutation } from "@/Redux/Api/teacherApi";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const UpdateTeacher = () => {
  const { id: teacherId } = useParams();

  // Fetch teacher data
  const { data: teacherData, isLoading: singleTeacherLoading } = useGetTeacherByIdQuery(teacherId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [updateTeacher, { isLoading: updating }] = useUpdateTeacherMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (teacherData?.result?.profileImage) {
      setImagePreview(teacherData.result.profileImage);
    }
  }, [teacherData]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("teacherName", data.teacherName);
      formData.append("designation", data.designation);
    
      formData.append("about", data.about);
      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      const response = await updateTeacher({ teacherId, formData }).unwrap();
      console.log(response,"check response")
      if (response?.success) {
        
        toast.success("Teacher Updated Successfully")
      } else {
       
      
      }
    } catch (error) {
     
      toast.error("An error occurred while updating the teacher" )
    }
  };

  if (singleTeacherLoading) return <div className="text-center text-white">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
            <ToastContainer position="bottom-right"/>
      <div className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Update Teacher</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium">Teacher Name</label>
            <input
              type="text"
              defaultValue={teacherData?.result?.userName}
              {...register("teacherName", { required: "Teacher name is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md"
              placeholder="Enter teacher name"
            />
            {errors.teacherName && <p className="text-red-300 text-sm">{errors?.teacherName?.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Designation</label>
            <input
              type="text"
              defaultValue={teacherData?.result?.designation}
              {...register("designation", { required: "Designation is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md"
              placeholder="Enter designation"
            />
            {errors.designation && <p className="text-red-300 text-sm">{errors?.designation?.message as string}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">About</label>
            <textarea
              defaultValue={teacherData?.result?.about}
              {...register("about", { required: "About section is required" })}
              className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-600 rounded-md"
              placeholder="Write about the teacher"
              rows={3}
            />
            {errors.about && <p className="text-red-300 text-sm">{errors?.about?.message as string}</p>}
          </div>

          <div className="text-center">
            <label className="block text-sm font-medium">Profile Image</label>
            <div className="flex flex-col items-center mt-2">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="w-32 h-32 rounded-md object-cover shadow-md" />
              ) : (
                <div className="w-32 h-32 rounded-md bg-gray-700 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <input type="file" id="profileImage" className="hidden" accept="image/*" onChange={handleImageChange} />
              <label
                htmlFor="profileImage"
                className="mt-3 px-4 py-2 bg-white text-black font-semibold rounded-md cursor-pointer hover:bg-gray-300"
              >
                Select File
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 font-semibold rounded-md transition ${
              updating ? "bg-gray-500 cursor-not-allowed" : "bg-white text-black hover:bg-gray-300"
            }`}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTeacher;
