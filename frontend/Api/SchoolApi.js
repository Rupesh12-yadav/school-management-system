import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const schoolApi = createApi({
  reducerPath: "schoolApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),

  tagTypes: ["Admin", "Teacher", "Student", "Event", "Notice", "Exam", "Homework", "Result", "Leave"],

  endpoints: (builder) => ({

    // 🔹 Auth Routes -----------------------
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Admin"]
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data
      })
    }),

    adminOnly: builder.query({
      query: () => "/auth/admin-only",
      providesTags: ["Admin"]
    }),

    // 🔹 Admin → Teacher Routes -----------------------
    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/admin/teachers/teacher/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Teacher"]
    }),

    getTeachers: builder.query({
      query: () => "/admin/teachers/teacher/all",
      providesTags: ["Teacher"]
    }),

    getTeacher: builder.query({
      query: (id) => `/admin/teachers/teacher/${id}`,
      providesTags: ["Teacher"]
    }),

    updateTeacher: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/teachers/teacher/update/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Teacher"]
    }),

    deleteTeacher: builder.mutation({
      query: (id) => ({
        url: `/admin/teachers/teacher/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Teacher"]
    }),

    // 🔹 Admin → Student Routes -----------------------
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/admin/students/student/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Student"]
    }),

    getStudents: builder.query({
      query: () => "/admin/students/student/all",
      providesTags: ["Student"]
    }),

    getStudent: builder.query({
      query: (id) => `/admin/students/student/${id}`,
      providesTags: ["Student"]
    }),

    updateStudent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/students/student/update/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Student"]
    }),

    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/admin/students/student/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Student"]
    }),

    // 🔹 Events Routes -----------------------
    addEvent: builder.mutation({
      query: (data) => ({
        url: "/admin/events/event/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Event"]
    }),

    getEvents: builder.query({
      query: () => "/admin/events/event/all",
      providesTags: ["Event"]
    }),

    getEvent: builder.query({
      query: (id) => `/admin/events/event/${id}`,
      providesTags: ["Event"]
    }),

    updateEvent: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/events/event/update/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Event"]
    }),

    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/admin/events/event/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Event"]
    }),

    // 🔹 Notice Routes -----------------------
    addNotice: builder.mutation({
      query: (data) => ({
        url: "/admin/notices/notice/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Notice"]
    }),

    getNotices: builder.query({
      query: () => "/admin/notices/notice/all",
      providesTags: ["Notice"]
    }),

    getNotice: builder.query({
      query: (id) => `/admin/notices/notice/${id}`,
      providesTags: ["Notice"]
    }),

    updateNotice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/notices/notice/update/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Notice"]
    }),

    deleteNotice: builder.mutation({
      query: (id) => ({
        url: `/admin/notices/notice/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Notice"]
    }),

    // 🔹 Teacher → Exam Routes -----------------------
    addExam: builder.mutation({
      query: (data) => ({
        url: "/teacher/exam/exam/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Exam"]
    }),

    getExams: builder.query({
      query: () => "/teacher/exam/exam/all",
      providesTags: ["Exam"]
    }),

    getExam: builder.query({
      query: (id) => `/teacher/exam/exam/${id}`,
      providesTags: ["Exam"]
    }),

    updateExam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/exam/exam/update/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Exam"]
    }),

    deleteExam: builder.mutation({
      query: (id) => ({
        url: `/teacher/exam/exam/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Exam"]
    }),

    // 🔹 Teacher → Homework Routes -----------------------
    addHomework: builder.mutation({
      query: (data) => ({
        url: "/teacher/homework/homework/add",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Homework"]
    }),

    getHomework: builder.query({
      query: () => "/teacher/homework/homework/all",
      providesTags: ["Homework"]
    }),

    getHomeworkById: builder.query({
      query: (id) => `/teacher/homework/homework/${id}`,
      providesTags: ["Homework"]
    }),

    updateHomework: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/homework/homework/update/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Homework"]
    }),

    deleteHomework: builder.mutation({
      query: (id) => ({
        url: `/teacher/homework/homework/delete/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Homework"]
    }),

    // 🔹 Teacher → Result Routes -----------------------
    addResult: builder.mutation({
      query: (data) => ({
        url: "/teacher/result/resultadd",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Result"]
    }),

    getResults: builder.query({
      query: () => "/teacher/result/resultget",
      providesTags: ["Result"]
    }),

    getResult: builder.query({
      query: (id) => `/teacher/result/result/${id}`,
      providesTags: ["Result"]
    }),

    updateResult: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teacher/result/result/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Result"]
    }),

    deleteResult: builder.mutation({
      query: (id) => ({
        url: `/teacher/result/result/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Result"]
    }),

    // 🔹 Student Leave Routes -----------------------
    addLeave: builder.mutation({
      query: (data) => ({
        url: "/student/leave/leaveadd",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Leave"]
    }),

    updateLeave: builder.mutation({
      query: ({ id, data }) => ({
        url: `/student/leave/leave/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Leave"]
    }),

    getStudentLeaves: builder.query({
      query: () => "/student/leave/leave/student",
      providesTags: ["Leave"]
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAdminOnlyQuery,

  useAddTeacherMutation,
  useGetTeachersQuery,
  useGetTeacherQuery,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,

  useAddStudentMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,

  useAddEventMutation,
  useGetEventsQuery,
  useGetEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,

  useAddNoticeMutation,
  useGetNoticesQuery,
  useGetNoticeQuery,
  useUpdateNoticeMutation,
  useDeleteNoticeMutation,

  useAddExamMutation,
  useGetExamsQuery,
  useGetExamQuery,
  useUpdateExamMutation,
  useDeleteExamMutation,

  useAddHomeworkMutation,
  useGetHomeworkQuery,
  useGetHomeworkByIdQuery,
  useUpdateHomeworkMutation,
  useDeleteHomeworkMutation,

  useAddResultMutation,
  useGetResultsQuery,
  useGetResultQuery,
  useUpdateResultMutation,
  useDeleteResultMutation,

  useAddLeaveMutation,
  useUpdateLeaveMutation,
  useGetStudentLeavesQuery
} = schoolApi;