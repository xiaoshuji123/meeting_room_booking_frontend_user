import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { message } from 'antd';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('action', action);
    // 这里返回的错误结果这个数据结构可以在发送请求那个函数里重新定义结构体
    message.error((action?.payload as any)?.data);
  }
  return next(action);
};
