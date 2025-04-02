"use client";

import {
  useDeleteCourseByIdMutation,
  useGetCoursesQuery,
} from "@/Redux/Api/courseApi";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";

interface ClassType {
  id: string;
  className: string;
  classNo: number;
  summary: string;
  thumbnail: string;
}

interface CourseType {
  id: string;
  courseName: string;
  about: string;
  image: string;
  teacher: {
    teacherName: string;
    id: string;
  };
  class: ClassType[];
}

const CourseList = () => {
  const { data, isLoading } = useGetCoursesQuery("");
  const [deleteCourse] = useDeleteCourseByIdMutation();
  const [deletingCourseId, setDeletingCourseId] = useState<string | null>(null);

  const handleDeleteCourse = async (courseId: string) => {
    setDeletingCourseId(courseId);
    try {
      const response = await deleteCourse(courseId).unwrap();
      if (response?.success) {
      
        toast.success("Course Deleted Successfully")
      } else {
        toast.error( "Failed to Delete Course" )
      
      }
    } catch (error: any) {
    toast.error( error.data.message )
    } finally {
      setDeletingCourseId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
                <ToastContainer position="bottom-right"/>
      <h2 className="text-4xl font-extrabold text-center mb-8 text-[#C11F94]">
        Explore Our Courses
      </h2>

      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader color={"#C11F94"} size={80} aria-label="Loading Spinner" data-testid="loader" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.result?.courses?.map((course: CourseType) => (
            <motion.div
              key={course.id}
              whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(193, 31, 148, 0.3)" }}
              transition={{ type: "spring", stiffness: 120, damping: 10 }}
              className="p-6 shadow-lg rounded-xl border border-gray-700 bg-gray-800"
            >
              {/* Course Image */}
              <img src={course?.image} alt={course?.courseName} className="w-full h-48 object-cover rounded-lg mb-5" />

              {/* Course Info */}
              <h3 className="text-2xl font-semibold text-[#C11F94]">{course?.courseName}</h3>
              <p className="text-gray-300 mt-2">{course?.about}</p>

              {/* Teacher Info */}
              <p className="text-sm text-gray-400 mt-1">
                Instructor: <span className="text-[#C11F94]">{course?.teacher?.teacherName}</span>
              </p>

              {/* Course Actions */}
              <div className="flex gap-3 mt-5">
                <Link
                  href={`/create-class/coursesId=${course.id}/?teacherId=${course?.teacher?.id}`}
                  className="flex-1 py-2 text-center bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Create Class
                </Link>
                <button
                  onClick={() => handleDeleteCourse(course.id)}
                  className="flex-1 py-2 bg-[#C11F94] text-white rounded-md hover:bg-[#a91c80] transition"
                  disabled={deletingCourseId === course.id}
                >
                  {deletingCourseId === course.id ? (
                    <>
                      <svg className="animate-spin h-4 w-4 inline mr-2" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>

              {/* Class List */}
              {course?.class?.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-[#C11F94]">Course Classes:</h4>
                  <ul className="space-y-3">
                    {course?.class?.map((cls: ClassType) => (
                      <li key={cls?.id} className="p-4 border border-gray-600 rounded-lg bg-gray-700 flex items-center gap-4">
                        <img src={cls?.thumbnail} alt={cls?.className} className="w-14 h-14 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-white">{cls.className}</p>
                          <p className="text-sm text-gray-300">{cls.summary}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
