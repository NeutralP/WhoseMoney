import { Spin } from 'antd';
import React from 'react';

const Fallback = () => {
  return (
    <div className="flex-1 flex justify-center items-center min-w-0 min-h-0">
      <Spin size="large" />
    </div>
  );
};

export default Fallback;
