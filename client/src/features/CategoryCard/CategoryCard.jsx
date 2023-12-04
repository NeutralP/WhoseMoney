import React, { useState } from 'react';
import { money } from '~/utils';
import ProgressBar from '~/features/EarningTarget/ProgressBar';

const CategoryCard = ({ category }) => {
  const [percentage, setPercentage] = useState(70);

  const testData = [{ bgcolor: '#1677ff', completed: percentage}];
  return (
    <div className="flex flex-col w-80 h-60 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gray-200 font-bold px-4 py-2 flex justify-between items-center text-lg">
        <div>{category.name}</div>
        <div>{money.formatVietnameseCurrency(category.amount)}</div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-white">
      <div style={{width: '200px'}}>
            {testData.map((item, idx) => (
              <ProgressBar
                key={idx}
                bgcolor={item.bgcolor}
                completed={item.completed}

              />
            ))}
          </div>
        <p className="text-gray-500 text-sm pr-5">70%</p>
      </div>
      {/* 1 bảng hiển thị 3 mục: Hạn mức, tổng chi và nên chi */}
      <div className="flex items-center justify-between px-4 py-2 bg-white">
        <p className="flex-1 text-gray-500 text-sm">
          Hạn mức: 1.000.000
          {/*bằng giá trị của paying_limit của category_id trong month đấy */}
        </p>
        <p className="flex-1 text-gray-500 text-sm">
          Tổng chi: {/*category.total*/}1.000.000
        </p>
        <p className="flex-1 text-gray-500 text-sm">
          Nên chi: {/*category.shouldSpend*/}1.000.000
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
