import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const customFetchBaseQuery = () => {
  return fetchBaseQuery({ baseUrl: '/api' });
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBaseQuery(),
  endpoints: (build) => ({
    getUser: build.query<any, void>({
      query: () => '/user',
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;
