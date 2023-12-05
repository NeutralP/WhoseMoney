import { Modal, Button } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import EditCategoryLimitModal from '../CategoryLimit/EditCategoryLimitModal';
import { money, objUtils } from '~/utils';
import dayjs from 'dayjs';
import ProgressBar from '../EarningTarget/ProgressBar';
import NoData from '../NoData/NoData';
import ExpenseManagementDeleteAlert from '../Expense/ExpenseManagementDeleteAlert';
import { FaEdit, FaEye } from 'react-icons/fa';
import PayingMoneyModal from '../PayingMoney/PayingMoneyModal';
import ExpensesDetailModal from '../Expense/ExpensesDetailModal';
import { formatDate } from '~/utils/time';
import axiosClient from '~/axios';
import { toast } from 'react-toastify';
import { userStateContext } from '~/contexts/ContextProvider';
import useCategoryStore from '~/store/useCategoryStore';

const numberOfDaysInCurrentMonth = dayjs().daysInMonth();

// Use for both add and edit
const ViewCategoryDetailModal = ({
  category = {},
  selectedMonth,
  selectedYear,
  open,
  setOpen,
}) => {
  if (objUtils.isEmptyObject(category)) return <></>;
  const { fetchUser } = userStateContext();
  const [fetchCategories] = useCategoryStore((state) => [
    state.fetchCategories,
  ]);

  const [selectedPayingMoney, setSelectedPayingMoney] = useState({});

  // This is for paying money
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const payLimit = useMemo(() => {
    return (
      category.pay_limit.find(
        (pay) => pay.month === selectedMonth && pay.year === selectedYear
      ) ?? {
        limit: 0,
      }
    );
  }, [category, selectedMonth, selectedYear]);

  const payList = useMemo(() => {
    return category.pay_list.filter((pay) => {
      const payDate = new Date(pay.date);
      return (
        payDate.getMonth() + 1 === selectedMonth &&
        payDate.getFullYear() === selectedYear
      );
    });
  }, [category, selectedMonth, selectedYear]);

  const prevTotalPay = useMemo(() => {
    return payList.reduce((acc, pay) => acc + pay.amount, 0);
  }, [payList]);

  const totalPay = useMemo(() => {
    return payList.reduce((acc, pay) => acc + pay.amount, 0);
  }, [payList]);

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
  }, []);

  const average = useMemo(() => {
    const payList = category.pay_list.filter((pay) => {
      const payDate = new Date(pay.date);
      return payDate.getFullYear() === selectedYear;
    });
    const totalPay = payList.reduce((acc, pay) => acc + pay.amount, 0);
    return Math.round(totalPay / 12);
  }, [category, selectedYear]);

  const handleCancel = () => {
    setOpen(false);
    console.log('Cancel');
  };

  const [editCategoryLimit, setEditCategoryLimit] = useState(false);

  const testData = [{ bgcolor: '#1677ff', completed: percentage }];

  const deleteExpense = (id) => {
    axiosClient
      .delete(`paying-money/${id}`)
      .then(() => {
        fetchCategories();

        toast.success('Xóa khoản chi thành công.', {
          autoClose: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Xóa khoản chi thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {
        fetchUser();
        setOpen(false);
      });
  };

  return (
    <>
      <Modal
        title={'Chi tiết danh mục'}
        open={open}
        onCancel={handleCancel}
        width={750}
        centered
        footer={null}
        className="custom-modal"
      >
        <div className="flex flex-col overflow-hidden max-h-[800px]">
          <h1 className="text-center text-2xl font-medium mb-4">
            {category.name}
          </h1>
          <div className="w-full grid grid-cols-3 gap-x-8">
            {/* This month */}
            <div className="w-full flex flex-col">
              <h2 className="text-lg font-medium text-center mb-2">
                Tháng này
              </h2>
              <div className="grid grid-cols-2 items-center gap-y-3">
                <p className="font-medium">Hạn mức:</p>
                <p className="text-right">{payLimit.limit}</p>
                <p className="font-medium">Số tiền đã chi:</p>
                <p className="text-right">{totalPay}</p>
                <p className="font-medium">Số tiền còn dư:</p>
                <p className="text-right">{payLimit.limit - totalPay}</p>
                <p className="font-medium">Nên chi:</p>
                <p className="text-right">{shouldSpend}</p>
              </div>
              <div className="w-full mt-3 progress-bar">
                {testData.map((item, idx) => (
                  <ProgressBar
                    key={idx}
                    bgcolor={item.bgcolor}
                    completed={item.completed}
                  />
                ))}
              </div>
            </div>

            {/* Prev month */}
            <div className="w-full flex flex-col">
              <h2 className="text-lg font-medium text-center mb-2">
                Tháng trước
              </h2>
              <div className="grid grid-cols-2 items-center gap-y-3">
                <p className="font-medium">Số tiền đã chi:</p>
                <p className="text-right">{prevTotalPay}</p>
                <p className="font-medium">Số tiền tiết kiệm:</p>
                <p className="text-right">???</p>
              </div>
            </div>

            {/* Average */}
            <div className="w-full flex flex-col items-start">
              <div className="w-full bg-box h-[124px] px-4 flex items-center gap-4 flex-col justify-center">
                <h2 className="text-base font-medium">Bình quân</h2>
                <p className="text-gray-600 text-lg text-center">
                  {money.formatVietnameseCurrency(average)}/Tháng
                </p>
              </div>
              <div className="w-full items-center justify-center flex">
                <button
                  onClick={() => setEditCategoryLimit(true)}
                  className="bg-box mt-4 inline-flex items-center justify-center px-2 py-1"
                >
                  Điều chỉnh hạn mức
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex-1 flex flex-col min-h-0 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-200 text-left text-gray-600">
                <tr>
                  <th className="p-4">Tên khoản chi</th>
                  <th className="p-4">Số tiền</th>
                  <th className="p-4">Thời gian</th>
                  <th className="p-4 ">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {payList.length > 0 &&
                  payList.map((expense) => (
                    <tr key={expense.id} className="border-b cursor-pointer">
                      <td className="p-4">{expense.name}</td>
                      <td className="p-4">
                        {money.formatVietnameseCurrency(expense.amount)}
                      </td>
                      <td className="p-4 ">
                        {formatDate(new Date(expense.date))}
                      </td>
                      <td
                        onClick={(e) => e.stopPropagation()}
                        className="p-4 flex items-center space-x-2"
                      >
                        <Button
                          onClick={() => {
                            setDetailModalOpen(true);
                            setSelectedPayingMoney(expense);
                          }}
                          className="text-blue-500"
                        >
                          <FaEye />
                        </Button>
                        <Button
                          onClick={() => {
                            setEditModalOpen(true);
                            setSelectedPayingMoney(expense);
                          }}
                        >
                          <FaEdit />
                        </Button>
                        <ExpenseManagementDeleteAlert
                          expense={expense}
                          deleteExpense={() => deleteExpense(expense.id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {payList.length === 0 && (
              <div className="w-full">
                <NoData />
              </div>
            )}
          </div>
        </div>
      </Modal>

      <PayingMoneyModal
        type={'edit'}
        open={editModalOpen}
        setOpen={(state) => setEditModalOpen(state)}
        payingMoneyData={selectedPayingMoney}
        setDetailModalOpen={setDetailModalOpen}
        openFromCategory={true}
        setCategoryDetailModalOpen={setOpen}
      />

      <ExpensesDetailModal
        open={detailModalOpen}
        setOpen={setDetailModalOpen}
        expense={selectedPayingMoney}
        setEditModalOpen={(state) => setEditModalOpen(state)}
        deleteExpense={() => deleteExpense(selectedPayingMoney.id)}
      />

      <EditCategoryLimitModal
        category={category}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        payLimit={payLimit.limit}
        open={editCategoryLimit}
        setOpen={setEditCategoryLimit}
        setDetailModalOpen={setOpen}
      />
    </>
  );
};

export default ViewCategoryDetailModal;
