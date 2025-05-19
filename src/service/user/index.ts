import { apiSlice } from '..';
import { LoginRequest, LoginResponse } from './type';
const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // query 是用于获取数据
    // mutation 是用于修改数据
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
