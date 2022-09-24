// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our single API slice object
export const registerApi = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'registerApi',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  // The "endpoints" represent operations and requests for this server
  endpoints(build) {
    return {
      registerUser: build.mutation({
        //I tried putting the "form" inside a curly braces bracket, it still keep throwing error
        query: (form) => ({
          url: '/users',
          method: 'post',
          body: form,
          headers: {
            'Content-type': 'application/json',
          },
        }),
      }),
    };
  },
});
// Export the auto-generated hook for the `getPosts` query endpoint
export const { useRegisterUserMutation } = registerApi;
