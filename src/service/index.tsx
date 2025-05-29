import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { localStorage } from 'src/utils/storage';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

type BaseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
const customFetchBaseQuery: BaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // 如果返回401错误，说明token过期
  if (result?.error?.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        // 调用刷新token的接口
        const refreshResult = await baseQuery(
          {
            url: '/user/refresh-token',
            method: 'GET',
            params: { refreshToken },
          },
          api,
          extraOptions,
        );
        const res = (refreshResult.data as any)?.data?.data;
        if (res) {
          // 更新本地存储的token
          const { accessToken, refreshToken: newRefreshToken } = res;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          // 使用新token重试原请求
          const retryResult = await baseQuery(args, api, extraOptions);
          return retryResult;
        }
      } catch (error) {
        // 如果刷新token失败，清除本地存储并跳转到登录页
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
  }

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
  console.log(data);

  return {
    data: {
      ...data.data,
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
  tagTypes: ['UserInfo'],
  endpoints: (build) => ({
    getUser: build.query<any, void>({
      query: () => '/user',
    }),
  }),
});

export const { useGetUserQuery } = apiSlice;
