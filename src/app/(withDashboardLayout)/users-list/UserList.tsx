"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";


import { useAllUsersQuery, useUserDeleteMutation } from "@/Redux/Api/userApi";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";

const UserList = () => {
  const router = useRouter();
  const { data, isLoading } = useAllUsersQuery("");
  const [deleteUser] = useUserDeleteMutation();



  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDeleteUser = async (id: string,subscriptions:boolean) => {
    if (subscriptions) {
 
      toast.error("Cannot delete a user with an active subscription")
      return;
    }
    setLoadingId(id); 



    try {
      const response = await deleteUser(id).unwrap();
      if (response?.success) {
    
        toast.success("User Deleted Successfully")
      } else {
        toast.error("Failed To  Delete ")
      }
    } catch (error) {
    
      toast.error("Failed To  Delete ")
    } finally {
      setLoadingId(null); // Reset loading state
    }
  };

  return (
    <div className="p-4 overflow-x-auto w-full max-w-6xl mx-auto">
           <ToastContainer position="bottom-right"/>
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        User List
      </h2>

      {isLoading ? (
        <div className="min-h-screen flex justify-center items-center">
          <ClipLoader
            color={"#C11F94"}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 text-left rounded-lg overflow-hidden min-w-[600px]">
            {/* Table Head */}
            <thead>
              <tr className="bg-gradient-to-r from-[#5B4BCD] to-[#C11F94] text-white">
                <th className="px-4 py-3">User Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Subscrtion</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data?.result?.users?.map((user: any) => (
                <tr
                  key={user?.id}
                  className="bg-black text-white border-b border-gray-700"
                >
                  <td className="px-4 py-3 break-words">
                    {user?.userName || "N/A"}
                  </td>
                  <td className="px-4 py-3 break-words">
                    {user?.email || "N/A"}
                  </td>
                  <td className="px-4 py-3">{user?.role || "N/A"}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      user?.status === "ACTIVE"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user?.status || "N/A"}
                  </td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      user?.subscriptions === true
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user?.subscriptions?"Paid":"Unpaid"}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => handleDeleteUser(user?.id,user.subscriptions)}
                      disabled={loadingId === user?.id }
                      className={`px-3 py-1 rounded-md transition ${
                        loadingId === user?.id
                          ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                          : "bg-[#C11F94] text-white hover:bg-[#a91c80]"
                      }`}
                    >
                      {loadingId === user?.id ? (
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
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Show message if no users exist */}
      {data?.result?.users?.length === 0 && (
        <div className="text-center text-gray-400 mt-4">No users found.</div>
      )}
    </div>
  );
};

export default UserList;
