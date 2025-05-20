import { apiSlice } from '..';
import { LoginRequest, LoginResponse, RegisterRequest, updatePasswordRequest, updateUserInfoRequest, UserInfoResponse } from './type';
const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // query 是用于获取数据
    registerCaptcha: builder.query<void, { email: string }>({
      query: (data) => ({
        url: '/user/register/captcha',
        method: 'GET',
        params: data,
      }),
    }),
    updatePasswordCaptcha: builder.query<void, { email: string }>({
      query: (data) => ({
        url: '/user/update-password/captcha',
        method: 'GET',
        params: data,
      }),
    }),
    updateUserInfoCaptcha: builder.query<void, { email: string }>({
      query: (data) => ({
        url: '/user/update/captcha',
        method: 'GET',
        params: data,
      }),
    }),
    getUserInfo: builder.query<UserInfoResponse, { userId: string }>({
      query: (data) => ({
        url: '/user/info',
        method: 'GET',
        params: data,
      }),
    }),
    // mutation 是用于修改数据
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/user/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: data,
      }),
    }),

    refreshToken: builder.mutation<
      { accessToken: string; refreshToken: string },
      { refreshToken: string }
    >({
      query: (data) => ({
        url: '/user/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),

    updatePassword: builder.mutation<void, updatePasswordRequest>({
      query: (data) => ({
        url: '/user/update-password',
        method: 'POST',
        body: data,
      }),
    }),

    updateUserInfo: builder.mutation<void, updateUserInfoRequest>({
      query: (data) => ({
        url: '/user/update-user-info',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = userApi;
