import React from 'react';
import { Empty } from 'antd';

const NoData = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} 
      description={
        <p className="text-ml text-gray-500">Không có danh mục nào</p>
      }/>
    </div>
  );
};

export default NoData;
