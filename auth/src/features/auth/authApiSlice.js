import { apiSlice } from "../../app/api/apiSlice";
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint for user login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    // Endpoint for refreshing tokens
    refresh: builder.mutation({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
    }),
    // Endpoint for user registration
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: { ...newUser },
      }),
    }),
  }),
});

// Exporting hooks for login and refresh mutations
export const { useLoginMutation, useRefreshMutation, useRegisterMutation } =
  authApiSlice;
