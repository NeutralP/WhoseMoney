import React, { useEffect, useState } from 'react';
import ReceiptManagementModal from '~/features/ReceiptManagementModal/ReceiptManagementModal';
import ReceiptManagementDeleteAlert from '~/features/ReceiptManagementDeleteAlert/ReceiptManagementDeleteAlert';
import { money } from '~/utils';
import { getDateLeftInCurrentMonth } from '~/utils/time';
import ReceiptsDetailModal from '../features/Receipt/ReceiptsDetailModal';

const ReceiptManagement = () => {
  const receipts_data = [
    {
      receipt_id: 1,
      receipt_name: 'Lương hàng tháng',
      receipt_source: 'Công ty ABC',
      receipt_amount: 1000000,
      time: '2023-10-02',
    },
    {
      receipt_id: 2,
      receipt_name: 'Bán phở',
      receipt_source: 'Ăn uống',
      receipt_amount: 500000,
      time: '2023-10-05',
    },
    {
      receipt_id: 3,
      receipt_name: 'Lương hàng tháng',
      receipt_source: 'Quán cà phê',
      receipt_amount: 500000,
      time: '2023-10-10',
    },
    {
      receipt_id: 4,
      receipt_name: 'Bán khoá học tiếng Nhật',
      receipt_source: 'Công ty ABC',
      receipt_amount: 500000,
      time: '2023-11-12',
    },
    {
      receipt_id: 5,
      receipt_name: 'Bán áo',
      receipt_source: 'Giải trí',
      receipt_amount: 500000,
      time: '2022-10-10',
    },
    {
      receipt_id: 6,
      receipt_name: 'Lương hàng tháng',
      receipt_source: 'Công ty ABC',
      receipt_amount: 500000,
      time: '2022-10-12',
    },
  ];
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [receipts, setReceipts] = useState(receipts_data);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [receiptDetailModalOpen, setReceiptDetailModalOpen] = useState(false);

  useEffect(() => {
    const newFilteredReceipts = receipts.filter((receipt) => {
      const receiptDate = new Date(receipt.time);
      return (
        (selectedMonth ? receiptDate.getMonth() + 1 === selectedMonth : true) &&
        (selectedYear ? receiptDate.getFullYear() === selectedYear : true)
      );
    });
    setFilteredReceipts(newFilteredReceipts);
  }, [receipts, selectedMonth, selectedYear]);

  const calculateTotalAmount = () => {
    return filteredReceipts.reduce((acc, receipt) => {
      const amount = receipt.receipt_amount;
      return acc + amount;
    }, 0);
  };

  const addReceipt = (receipt) => {
    setReceipts([...receipts, { ...receipt, receipt_id: receipts.length + 1 }]);
    console.log(receipts);
  };

  const deleteReceipt = (receiptToDelete) => {
    setReceipts((prevReceipts) =>
      prevReceipts.filter(
        (receipt) => receipt.receipt_id !== receiptToDelete.receipt_id
      )
    );
  };

  return (
    <div className="mt-8 overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Quản lý khoản thu
      </h2>
      <div className="flex container justify-between">
        <p className="mb-6">
          Tổng tiền đã thu:{' '}
          {money.formatVietnameseCurrency(calculateTotalAmount())}
        </p>
        <p className="">
          Số ngày còn lại trong tháng: {getDateLeftInCurrentMonth()}
        </p>
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
            {filteredReceipts.map((receipt) => (
              <tr
                onClick={() => {
                  setSelectedReceipt(receipt);
                  setReceiptDetailModalOpen(true);
                }}
                key={receipt.receipt_id}
                className="border-b cursor-pointer"
              >
                <td className="p-4">{receipt.receipt_name}</td>
                <td className="p-4">{receipt.receipt_source}</td>
                <td className="p-4">
                  {money.formatVietnameseCurrency(receipt.receipt_amount)}
                </td>
                <td className="p-4 ">{receipt.time}</td>
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="p-4 flex items-center space-x-2"
                >
                  <button className="text-blue-500 hover:text-blue-700">
                    View
                  </button>
                  <button className="text-green-500 hover:text-green-700">
                    Edit
                  </button>
                  <ReceiptManagementDeleteAlert
                    receipt={receipt}
                    deleteReceipt={deleteReceipt}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      />
    </div>
  );
};

export default ReceiptManagement;
