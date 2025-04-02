import UpdateTeacher from "@/app/(withDashboardLayout)/update-teacher/[id]/UpdateTeacher";
import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTeacher: build.query({
      query: (query: string) => ({
        url: `/admin/teachers/list?search=${query}`,
        method: "GET",
      }),
      providesTags: [tagTypes.teachers],
    }),
    createTeacher: build.mutation({
      query: (data) => {
        return {
          url: `/admin/create/teacher`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.teachers],
    }),
    UpdateTeacher: build.mutation({
      query: ({ teacherId, formData }) => {
        return {
          url: `/admin/teacher/${teacherId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.teachers],
    }),
    getTeacherById: build.query({
      query: (teacherId) => {
        return {
          url: `users/teacher-details/${teacherId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.teachers],
    }),
    deleteTeacherById: build.mutation({
      query: (teacherId) => {
        return {
          url: `admin/teacher/${teacherId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.teachers],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
  useGetTeacherByIdQuery,
  useDeleteTeacherByIdMutation
} = teacherApi;
