import React, { useState } from 'react';
import { money } from '~/utils';
import { getDateLeftInCurrentMonth } from '~/utils/time';

const ExpenseManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const expenses = [
    { paying_id: 1, paying_name: 'Mua giáo trình', category_name: 'Học tập', paying_amount: 1000000, time: '2023-10-02' },
    { paying_id: 2, paying_name: 'Ăn phở', category_name: 'Ăn uống', paying_amount: 500000, time: '2023-10-05' },
    { paying_id: 3, paying_name: 'Nạp game', category_name: 'Giải trí', paying_amount: 500000, time: '2023-10-10' },
    { paying_id: 4, paying_name: 'Học tiếng Nhật', category_name: 'Học tập', paying_amount: 500000, time: '2023-11-12' },
    { paying_id: 5, paying_name: 'Mua áo', category_name: 'Giải trí', paying_amount: 500000, time: '2022-10-10' },
    { paying_id: 6, paying_name: 'Mua điện thoại', category_name: 'Học tập', paying_amount: 500000, time: '2022-10-12' },
  ];

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.time);
    return (
      (selectedMonth ? expenseDate.getMonth() + 1 === selectedMonth : true) &&
      (selectedYear ? expenseDate.getFullYear() === selectedYear : true)
    );
  });

  const calculateTotalAmount = () => {
    return expenses.reduce((acc, expense) => {
      const amount = expense.paying_amount;
      return acc + amount
    }, 0);
  }

  return (
    <div className="mt-8 overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Quản lý khoản chi</h2>
      <div className="flex container justify-between">
      <p className="mb-6">Tổng tiền đã chi: {money.formatVietnameseCurrency(calculateTotalAmount())}</p>
      <p className="">Số ngày còn lại trong tháng: {getDateLeftInCurrentMonth()}</p>
      </div>
      <div className="flex mb-4 justify-end">
        <p className="align-middle mt-2 mr-2">Lọc theo tháng: </p>
        <select
          className="border border-gray-300 bg-white rounded mr-2 p-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          <option value="">Tháng</option>
          {[...Array(12).keys()].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-300 bg-white rounded p-2"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          <option className="bg-white" value="">Năm</option>
          {[...Array(10).keys()].map((_, i) => (
            <option key={i} value={new Date().getFullYear() - i}>
              {new Date().getFullYear() - i}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-x-auto mb-4">
        <table className="w-full">
          <thead className="bg-gray-200 text-left text-gray-600">
            <tr>
              <th className="p-4">Tên khoản chi</th>
              <th className="p-4">Danh mục</th>
              <th className="p-4">Số tiền</th>
              <th className="p-4">Thời gian</th>
              <th className="p-4 ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.paying_id} className="border-b">
                <td className="p-4">{expense.paying_name}</td>
                <td className="p-4">{expense.category_name}</td>
                <td className="p-4">{money.formatVietnameseCurrency(expense.paying_amount)}</td>
                <td className="p-4 ">{expense.time}</td>
                <td className="p-4 flex items-center	  space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    View
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 float-right  rounded">
        Thêm khoản chi
      </button>
    </div>
  );
};

export default ExpenseManagement;
