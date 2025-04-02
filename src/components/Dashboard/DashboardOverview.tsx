"use client";
import { useState } from "react";
import {
  FaUser,
  FaChalkboardTeacher,
  FaBook,
  FaGraduationCap,
  FaSortAmountDown,
} from "react-icons/fa";
import CountUp from "react-countup";
import {
  useGetDashoboardOverViewQuery,
  useTotalEarningQuery,
} from "@/Redux/Api/dashboardApi";
import Image from "next/image";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

export default function DashboardOverview() {
  const { data, isLoading } = useGetDashoboardOverViewQuery(undefined);

  const { data: totalEarning, isLoading: isTotalLoading } =
    useTotalEarningQuery(undefined);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const overview = data?.result;
  console.log(overview, "check overview");
  const earning = totalEarning?.result;
  const formatEarnings = (amount: number) => {
    return `$${amount.toLocaleString()}`; // Adds comma formatting for large numbers
  };
  const cardData = [
    {
      title: "Total Earnings",
      value: earning?.totalAmount || 0,
      formattedValue: formatEarnings(earning?.totalAmount || 0),
      icon: <FaSortAmountDown className="text-primary text-3xl" />,
    },
    {
      title: "Total Courses",
      value: overview?.totalCourses || 0,
      icon: <FaBook className="text-primary text-3xl" />,
    },
    {
      title: "Total Classes",
      value: overview?.totalClasses || 0,
      icon: <FaChalkboardTeacher className="text-primary text-3xl" />,
    },
    {
      title: "Total Teachers",
      value: overview?.totalTeachers || 0,
      icon: <FaUser className="text-primary text-3xl" />,
    },
    {
      title: "Total Students",
      value: overview?.totalStudents || 0,
      icon: <FaGraduationCap className="text-primary text-3xl" />,
    },
  ];

  if (isLoading || isTotalLoading) {
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
    <div className="pt-6 pb-32 px-5 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-primary">
            Dashboard Overview
          </h1>
          <p className="text-gray-500">{formatDate(new Date())}</p>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="bg-white border rounded-lg shadow-md p-5 flex items-center justify-between space-x-4"
          >
            <div className="bg-slate-100 p-4 rounded-full">{card.icon}</div>
            <div>
              <p className="text-2xl font-bold text-gray-900 text-end">
                {card.title === "Total Earnings" ? (
                  card.formattedValue
                ) : (
                  <CountUp
                    end={card.value}
                    className="text-primary font-semibold"
                    duration={1.5}
                  />
                )}
              </p>
              <h3 className="text-lg text-gray-500 mt-2 text-end">
                {card.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Course, Top Class, and Top Teacher in the same row */}
      {(overview?.topCourse || overview?.topTeacher) && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-primary">
            Top Course & Teacher
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Course */}
            {overview?.topCourse && typeof overview.topCourse === "object" ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <h4 className="text-lg font-semibold text-primary">
                  Top Course
                </h4>
                <Image
                  src={overview.topCourse.image}
                  alt={overview.topCourse.courseName}
                  width={200}
                  height={150}
                  className="rounded-lg shadow-lg"
                />
                <h4 className="text-xl font-bold mt-3">
                  {overview.topCourse.courseName}
                </h4>
                <p className="text-gray-600 text-sm mt-1 text-center">
                  {overview.topCourse.about}
                </p>
              </motion.div>
            ) : (
              <div className="col-span-1 flex justify-center items-center bg-yellow-100 p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <FaBook className="text-6xl text-yellow-500 mx-auto mb-4" />
                  <p className="text-gray-700 text-xl font-semibold">
                    No Course Found
                  </p>
                  <p className="text-gray-500">
                    We couldn't find any course available at the moment.
                  </p>
                </div>
              </div>
            )}

            {/* Top Class */}
            {/* {overview?.topCourse?.class?.length > 0 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <h4 className="text-lg font-semibold text-primary">Top Class</h4>
                <p className="text-gray-600 text-sm mt-2">{overview.topCourse.class[0].className}</p>
                {overview.topCourse.class[0].classVideo && (
                  <iframe
                    src={overview.topCourse.class[0].classVideo}
                    title={overview.topCourse.class[0].className}
                    className="w-full h-48 md:h-56 rounded-lg shadow-md mt-3"
                    allowFullScreen
                  ></iframe>
                )}
              </motion.div>
            )} */}

            {/* Top Teacher */}
            {overview?.topTeacher && typeof overview.topTeacher === "object" ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <h4 className="text-lg font-semibold text-primary">
                  Top Teacher
                </h4>
                <Image
                  src={overview.topTeacher.profileImage}
                  alt={overview.topTeacher.teacherName}
                  width={100}
                  height={100}
                  className="rounded-full shadow"
                />
                <h4 className="text-xl font-bold mt-3">
                  {overview.topTeacher.teacherName}
                </h4>
                <p className="text-gray-600 text-sm mt-1">
                  {overview.topTeacher.designation}
                </p>
                <p className="text-gray-500 text-sm">
                  {overview.topTeacher.email}
                </p>
              </motion.div>
            ) : (
              <div className="col-span-1 flex justify-center items-center bg-red-100 p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <FaChalkboardTeacher className="text-6xl text-red-500 mx-auto mb-4" />
                  <p className="text-gray-700 text-xl font-semibold">
                    No Teacher Found
                  </p>
                  <p className="text-gray-500">
                    It looks like no teacher is available for now.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
