import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../service';
import globalReducer from './global';
import { useDispatch, useSelector } from 'react-redux';
import { rtkQueryErrorLogger } from './middleware';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, rtkQueryErrorLogger),
});

// 可以参考 https://redux-toolkit.js.org/tutorials/typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 对于 useDispatch，默认的 Dispatch 类型不知道 thunks。为了正确 dispatch thunk，您需要使用来自 store 的特定自定义 AppDispatch 类型
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
