import React, { useMemo } from 'react';
import { money } from '~/utils';
import ProgressBar from '~/features/EarningTarget/ProgressBar';
import dayjs from 'dayjs';

const numberOfDaysInCurrentMonth = dayjs().daysInMonth();

const CategoryCard = ({
  setSelectedCategory,
  setDetailModalOpen,
  selectedMonth,
  selectedYear,
  category,
}) => {
  const payLimit = useMemo(() => {
    return (
      category.pay_limit.find(
        (pay) => pay.month === selectedMonth && pay.year === selectedYear
      ) ?? {
        limit: 0,
      }
    );
  }, [category, selectedMonth, selectedYear]);

  const totalPay = useMemo(() => {
    const payList = category.pay_list.filter((pay) => {
      const payDate = new Date(pay.date);
      return (
        payDate.getMonth() + 1 === selectedMonth &&
        payDate.getFullYear() === selectedYear
      );
    });
    return payList.reduce((acc, pay) => acc + pay.amount, 0);
  }, [category, selectedMonth, selectedYear]);

  const percentage = useMemo(() => {
    if (!payLimit || totalPay === 0) {
      return 0;
    }
    const value = Math.round(totalPay / payLimit.limit);
    return value > 100 ? 100 : value;
  }, [totalPay, payLimit]);

  const shouldSpend = useMemo(() => {
    const value = Math.round(
      (payLimit.limit - totalPay) / numberOfDaysInCurrentMonth
    );
    return value < 0 ? 0 : value;
  }, [payLimit, totalPay, numberOfDaysInCurrentMonth]);

  const testData = [{ bgcolor: '#1677ff', completed: percentage }];

  return (
    <div
      onClick={() => {
        setDetailModalOpen(true);
        setSelectedCategory(category);
      }}
      className="flex flex-col w-80 h-60 bg-white hover:shadow-lg cursor-pointer shadow-md rounded-lg overflow-hidden"
    >
      <div className="bg-gray-200 font-bold px-4 py-2 flex justify-between items-center text-lg">
        <div>{category.name}</div>
        <div>{money.formatVietnameseCurrency(payLimit.limit)}</div>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-white">
        <div style={{ width: '200px' }}>
          {testData.map((item, idx) => (
            <ProgressBar
              key={idx}
              bgcolor={item.bgcolor}
              completed={item.completed}
            />
          ))}
        </div>
        <p className="text-gray-500 text-sm pr-5">{percentage}%</p>
      </div>
      {/* 1 bảng hiển thị 3 mục: Hạn mức, tổng chi và nên chi */}
      <div className="flex items-center justify-between px-4 py-2 bg-white">
        <p className="flex-1 text-gray-500 text-sm">
          Hạn mức:&nbsp;{payLimit.limit}
          {/*bằng giá trị của paying_limit của category_id trong month đấy */}
        </p>
        <p className="flex-1 text-gray-500 text-sm">Tổng chi: {totalPay}</p>
        <p className="flex-1 text-gray-500 text-sm">
          Nên chi:&nbsp;
          {shouldSpend}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
