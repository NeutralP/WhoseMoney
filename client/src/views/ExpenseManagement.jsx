import React, { useEffect, useState } from 'react';
import { money } from '~/utils';
import { getDateLeftInCurrentMonth } from '~/utils/time';
import axiosClient from '~/axios';
import { FaEye, FaEdit } from 'react-icons/fa';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import ExpenseManagementDeleteAlert from '~/features/Expense/ExpenseManagementDeleteAlert';
import usePayingMoneyStore from '~/store/usePayingMoneyStore';
import Fallback from '~/components/Fallback';
import PayingMoneyModal from '~/features/PayingMoney/PayingMoneyModal';
import useCategoryStore from '~/store/useCategoryStore';

const ExpenseManagement = () => {
  const [payingMoney, fetchingPayingMoney, fetchPayingMoney] =
    usePayingMoneyStore((state) => [
      state.payingMoney,
      state.fetchingPayingMoney,
      state.fetchPayingMoney,
    ]);

  const [fetchingCategories, fetchCategories] = useCategoryStore((state) => [
    state.fetchingCategories,
    state.fetchCategories,
  ]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [expenses, setExpenses] = useState([]);
  const [filteredExpeneses, setFilteredExpenses] = useState([]);

  // Edit | Add
  const [modalOpen, setModalOpen] = useState({
    state: false,
    type: 'add',
    selectedPayingMoney: null,
  });

  useEffect(() => {
    fetchPayingMoney();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setExpenses(payingMoney);
  }, [payingMoney]);

  useEffect(() => {
    const newFilteredExpenses = expenses.filter((expense) => {
      const receiptDate = new Date(expense.date);
      return (
        (selectedMonth ? receiptDate.getMonth() + 1 === selectedMonth : true) &&
        (selectedYear ? receiptDate.getFullYear() === selectedYear : true)
      );
    });
    setFilteredExpenses(newFilteredExpenses);
  }, [expenses, selectedMonth, selectedYear]);

  const deleteExpense = (expenseToDelete) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseToDelete.id)
    );
    toast.success('Xóa khoản chi thành công.', {
      autoClose: 1500,
    });
  };

  const calculateTotalAmount = () => {
    return filteredExpeneses.reduce((acc, receipt) => {
      const amount = receipt.amount;
      return acc + amount;
    }, 0);
  };

  if (fetchingPayingMoney || fetchingCategories) return <Fallback />;

  return (
    <div className="mt-8 overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Quản lý khoản chi
      </h2>
      <div className="flex container justify-between mb-3">
        <p className="">
          Tổng tiền đã chi:{' '}
          {money.formatVietnameseCurrency(calculateTotalAmount())}
        </p>
        <p className="">
          Số ngày còn lại trong tháng: {getDateLeftInCurrentMonth()}
        </p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div></div>
        <div className="flex items-center">
          <p className="align-middle mr-2">Lọc theo tháng: </p>
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
            <option className="bg-white" value="">
              Năm
            </option>
            {[...Array(10).keys()].map((_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
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
            {filteredExpeneses.map((expense) => (
              <tr key={expense.id} className="border-b cursor-pointer">
                <td className="p-4">{expense.name}</td>
                <td className="p-4">{expense.category}</td>
                <td className="p-4">
                  {money.formatVietnameseCurrency(expense.amount)}
                </td>
                <td className="p-4 ">{expense.date}</td>
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="p-4 flex items-center space-x-2"
                >
                  <Button onClick={() => {}} className="text-blue-500">
                    <FaEye />
                  </Button>
                  <Button onClick={() => {}}>
                    <FaEdit />
                  </Button>
                  <ExpenseManagementDeleteAlert
                    expense={expense}
                    deleteExpense={deleteExpense}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() =>
          setModalOpen({
            ...modalOpen,
            state: true,
          })
        }
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 float-right  rounded"
      >
        Thêm khoản chi
      </button>

      <PayingMoneyModal
        type={modalOpen.type}
        open={modalOpen.state}
        setOpen={(state) => setModalOpen({ ...modalOpen, state })}
        payingMoneyData={modalOpen.selectedPayingMoney}
      />
    </div>
  );
};

export default ExpenseManagement;
