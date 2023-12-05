import React, { useEffect, useMemo, useState } from 'react';
import ReceiptManagementModal from '~/features/ReceiptManagementModal/ReceiptManagementModal';
import ReceiptManagementDeleteAlert from '~/features/ReceiptManagementDeleteAlert/ReceiptManagementDeleteAlert';
import { money } from '~/utils';
import { getDateLeftInCurrentMonth } from '~/utils/time';
import ReceiptsDetailModal from '../features/Receipt/ReceiptsDetailModal';
import axiosClient from '~/axios';
import { FaEye, FaEdit } from 'react-icons/fa';
import CreateEarningTargetModal from '~/features/EarningTarget/CreateEarningTargetModal';
import { Tooltip, Button } from 'antd';
import EditReceiptModal from '~/features/Receipt/EditReceiptModal';
import { toast } from 'react-toastify';
import ProgressBar from '~/features/EarningTarget/ProgressBar';
import Fallback from '~/components/Fallback';
import NoData from '~/features/NoData/NoData';
import useEarningStore from '~/store/useEarningStore';

const ReceiptManagement = () => {
  const [targets, fetchingTargets, fetchTargets] = useEarningStore((state) => [
    state.targets,
    state.fetchingTargets,
    state.fetchTargets,
  ]);

  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [receipts, setReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [receiptDetailModalOpen, setReceiptDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createEarningTarget, setCreateEarningTarget] = useState(false);

  useEffect(() => {
    axiosClient
      .get('/earning-money')
      .then(({ data }) => {
        setReceipts(data.data);
        setFilteredReceipts(data.data);
        setLoading(false);
        // console.log(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchTargets();
  }, []);

  const calculateTotalAmount = () => {
    return filteredReceipts.reduce((acc, receipt) => {
      const amount = receipt.amount;
      return acc + amount;
    }, 0);
  };

  const thisMonthTarget = useMemo(() => {
    return (
      targets.find(
        (target) =>
          target.month === selectedMonth && target.year === selectedYear
      ) ?? {
        target: 0,
      }
    );
  }, [targets, selectedMonth, selectedYear]);

  const percentage = useMemo(() => {
    if (thisMonthTarget.target === 0) return 0;
    return Math.round((calculateTotalAmount() / thisMonthTarget.target) * 100);
  }, [thisMonthTarget]);

  useEffect(() => {
    const newFilteredReceipts = receipts.filter((receipt) => {
      const receiptDate = new Date(receipt.date);
      return (
        (selectedMonth ? receiptDate.getMonth() + 1 === selectedMonth : true) &&
        (selectedYear ? receiptDate.getFullYear() === selectedYear : true)
      );
    });
    setFilteredReceipts(newFilteredReceipts);
  }, [receipts, selectedMonth, selectedYear]);

  const addReceipt = (receipt) => {
    setReceipts([...receipts, { ...receipt }]);
    // console.log(receipts);
    toast.success('Thêm khoản thu thành công.', {
      autoClose: 1500,
    });
  };

  const editReceipt = (receipt) => {
    setReceipts(
      receipts.map((item) => {
        if (item.id === receipt.id) return receipt;
        else return item;
      })
    );
    toast.success('Chỉnh sửa khoản thu thành công.', {
      autoClose: 1500,
    });
  };

  const deleteReceipt = (receiptToDelete) => {
    setReceipts((prevReceipts) =>
      prevReceipts.filter((receipt) => receipt.id !== receiptToDelete.id)
    );
    toast.success('Xóa khoản thu thành công.', {
      autoClose: 1500,
    });
  };

  const testData = [{ bgcolor: '#1677ff', completed: percentage }];

  if (loading || fetchingTargets) {
    return <Fallback />;
  }

  return (
    <div className="mt-8 overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Quản lý khoản thu
      </h2>
      <div className="flex container justify-between mb-3">
        <p className="">
          Tổng tiền đã thu:{' '}
          {money.formatVietnameseCurrency(calculateTotalAmount())}
        </p>
        <p className="">
          Số ngày còn lại trong tháng: {getDateLeftInCurrentMonth()}
        </p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div>
          <Tooltip placement="top" title="Nhấn để thay đổi mục tiêu">
            <p
              onClick={() => {
                setCreateEarningTarget(true);
              }}
              className="mb-6 cursor-pointer"
            >
              Mục tiêu: {money.formatVietnameseCurrency(thisMonthTarget.target)}
            </p>
          </Tooltip>
          <div style={{ width: '200px' }}>
            {testData.map((item, idx) => (
              <ProgressBar
                key={idx}
                bgcolor={item.bgcolor}
                completed={item.completed}
              />
            ))}
          </div>
        </div>
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
              <th className="p-4">Tên khoản thu</th>
              <th className="p-4">Nguồn tiền</th>
              <th className="p-4">Số tiền</th>
              <th className="p-4">Thời gian</th>
              <th className="p-4 ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceipts.length > 0 &&
              filteredReceipts.map((receipt, index) => (
                <tr
                  // onClick={() => {
                  //   setSelectedReceipt(receipt);
                  //   setReceiptDetailModalOpen(true);
                  // }}
                  key={receipt.id + index}
                  className="border-b cursor-pointer"
                >
                  <td className="p-4">{receipt.name}</td>
                  <td className="p-4">{receipt.source}</td>
                  <td className="p-4">
                    {money.formatVietnameseCurrency(receipt.amount)}
                  </td>
                  <td className="p-4 ">{receipt.date}</td>
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className="p-4 flex items-center space-x-2"
                  >
                    <Button
                      onClick={() => {
                        setSelectedReceipt(receipt);
                        setReceiptDetailModalOpen(true);
                      }}
                      className="text-blue-500"
                    >
                      <FaEye />
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedReceipt(receipt);
                        setEditModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <ReceiptManagementDeleteAlert
                      receipt={receipt}
                      deleteReceipt={deleteReceipt}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filteredReceipts.length === 0 && (
          <div className="w-full">
            <NoData />
          </div>
        )}
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 float-right  rounded"
      >
        Thêm khoản thu
      </button>

      <ReceiptManagementModal
        isOpen={isModalOpen}
        onSave={addReceipt}
        onClose={() => setModalOpen(false)}
      />

      <ReceiptsDetailModal
        open={receiptDetailModalOpen}
        setOpen={setReceiptDetailModalOpen}
        receipt={selectedReceipt}
        setEditModalOpen={setEditModalOpen}
        deleteReceipt={deleteReceipt}
      />

      <EditReceiptModal
        open={editModalOpen}
        receipt={selectedReceipt}
        setSelectedReceipt={setSelectedReceipt}
        setOpen={setEditModalOpen}
        editReceipt={editReceipt}
      />

      <CreateEarningTargetModal
        prevTarget={thisMonthTarget}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        open={createEarningTarget}
        setOpen={setCreateEarningTarget}
      />
    </div>
  );
};

export default ReceiptManagement;
