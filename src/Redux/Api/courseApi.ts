import { tagTypes } from "../tags.type";
import baseApi from "./baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCourses: build.query({
      query: (query:string) => ({
        url: `admin/all-courses?search=${query}`,
        method: "GET",
       
      }),
      providesTags: [tagTypes.courses],
    }),
    createCourse: build.mutation({
      query: ({teacherId,formData}) => {
     
        return {
          url: `/course/create/${teacherId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.courses],
    }),
    createClass: build.mutation({
      query: ({teacherId,formData}) => {
        // console.log(formData,teacherId)
        return {
          url: `/course/class/create/${teacherId}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.courses],
    }),
    getCourseById: build.query({
      query: (courseId) => {
        return {
          url: `/course/single/course/${courseId}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.teachers],
    }),
    updateCourse: build.mutation({
      query: ({ teacherId, formData }) => {
        return {
          url: `/admin/teacher/${teacherId}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: [tagTypes.teachers],
    }),
    deleteCourseById: build.mutation({
      query: (courseId) => {
        return {
          url: `/admin/course/${courseId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.teachers,tagTypes.courses],
    }),
  }),
  
});

export const { useGetCoursesQuery,useCreateCourseMutation,useDeleteCourseByIdMutation,useGetCourseByIdQuery,useUpdateCourseMutation,useCreateClassMutation,} = courseApi;
