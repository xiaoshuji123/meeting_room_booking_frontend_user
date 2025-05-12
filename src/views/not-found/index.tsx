import type { JSX } from "react";
import "./index.module.less";
import { Empty } from "antd";

const NotFound = (): JSX.Element => {
  return (
    <div styleName="not-found-wrapper">
      <Empty description="页面不存在" />
    </div>
  );
};

export default NotFound;
