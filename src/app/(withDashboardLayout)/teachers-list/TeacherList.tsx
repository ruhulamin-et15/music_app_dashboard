"use client";
import {
  useDeleteTeacherByIdMutation,
  useGetTeacherQuery,
} from "@/Redux/Api/teacherApi";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";

const TeacherList = () => {
  const router = useRouter();
  const { data, isLoading } = useGetTeacherQuery("");
  const [deleteTeacher] = useDeleteTeacherByIdMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null); // Track the teacher being deleted

  // Handle course creation
 
  const handleDeleteTeacher = async (id: string) => {
    setLoadingId(id); // Set the current teacher being deleted
    try {
      const response = await deleteTeacher(id).unwrap();
      if (response?.success) {

        toast.success("Teacher Deleted Successfully")
      } else {
       
        toast.error("Failed to Delete teacher")
      }
    } catch (error: any) {
    
      toast.error(error.data.message)
    } finally {
      setLoadingId(null); // Reset loading state after deletion
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <ClipLoader color={"#C11F94"} size={80} aria-label="Loading Spinner" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
         <ToastContainer position="bottom-right"/>
      <div className="overflow-hidden rounded-lg border border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead>
              <tr className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white text-sm sm:text-base">
                <th className="px-4 sm:px-6 py-3">Teacher Name</th>
                <th className="px-4 sm:px-6 py-3">Designation</th>
                <th className="px-4 sm:px-6 py-3">Email</th>
                <th className="px-4 sm:px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data?.result?.teachers?.map((teacher: any) => (
                <tr key={teacher?.id} className="bg-black text-white border-b border-gray-700 text-xs sm:text-sm">
                  <td className="px-4 sm:px-6 py-3">{teacher?.teacherName || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3">{teacher?.designation || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3">{teacher?.email || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-2 justify-center">
                    <Link href={`/update-teacher/${teacher.id}`} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#5B4BCD] text-white rounded-md hover:bg-[#4a3bb7] transition text-center">
                      Update
                    </Link>
                    <button
                      onClick={() => handleDeleteTeacher(teacher.id)}
                      disabled={loadingId === teacher.id}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition text-center ${
                        loadingId === teacher.id
                          ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                          : "bg-[#C11F94] text-white hover:bg-[#a91c80]"
                      }`}
                    >
                      {loadingId === teacher.id ? "Deleting..." : "Delete"}
                    </button>
                    <Link href={`/create-course/${teacher.id}`} className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition text-center">
                      Create Course
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Teachers Found Message */}
      {data?.result?.teachers?.length === 0 && (
        <div className="text-center text-gray-400 mt-4">No teachers found.</div>
      )}
    </div>
  );
};

export default TeacherList;
