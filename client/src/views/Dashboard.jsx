import React from 'react';
import { userStateContext } from '~/contexts/ContextProvider';
import { money } from '~/utils';
import CategoryManagement from './CategoryManagement';

const fields = [
  {
    title: 'Số dư',
    field: 'cur_balance',
  },
  {
    title: 'Tổng chi',
    field: 'total_pay',
  },
  {
    title: 'Tổng thu',
    field: 'total_earn',
  },
  {
    title: 'Tiết kiệm',
    field: 'total_save',
  },
];

const Dashboard = () => {
  const { currentUser } = userStateContext();

  return (
    <div className="flex flex-col p-6 flex-1 min-h-0 min-w-0 overflow-y-auto">
      <div className="w-full px-3 flex items-center justify-between gap-4">
        {fields.map((field) => (
          <div
            key={field.field}
            className="flex flex-col gap-4 h-[124px] items-center flex-1 bg-white rounded-md shadow-md p-4"
          >
            <p className="text-gray-400 text-xl font-bold">{field.title}</p>
            <p className="text-2xl font-bold text-gray-700">
              {money.formatVietnameseCurrency(currentUser[field.field])}
            </p>
          </div>
        ))}
      </div>
      <div className="flex-1 min-h-0 min-w-0">
        <CategoryManagement />
      </div>
    </div>
  );
};

export default Dashboard;
