import type { JSX } from "react";
import { Empty } from "antd";

const NotFound = (): JSX.Element => {
  return <Empty description="页面不存在" />;
};

export default NotFound;
