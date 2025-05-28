import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
const customFetchBaseQuery: BaseQuery = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({ baseUrl: '/api' })(args, api, extraOptions);
  const { data = {} as any, meta = {} } = result;
  if (result?.error) {
    return {
      error: result?.error?.data as any,
      meta: {
        ...meta,
        extraOptions,
      },
    };
  }
  return {
    data: {
      ...data.data.data,
    },
    meta: {
      ...meta,
      extraOptions,
    },
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBaseQuery,
  endpoints: (build) => ({
    getUser: build.query<any, void>({
      query: () => '/user',
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;
