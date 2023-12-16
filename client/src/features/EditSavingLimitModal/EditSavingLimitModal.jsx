import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import dayjs from 'dayjs';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import axiosClient from '~/axios';
import { toast } from 'react-toastify';

const numberOfDaysInCurrentMonth = dayjs().daysInMonth();

const EditSavingLimitModal = ({
  open,
  savingMoney,
  setSavingMoney,
  setOpen,
}) => {
  const [limit, setLimit] = useState(0);
  const currentDate = new Date();
  const initialMonth = currentDate.getMonth() + 1; // getMonth() returns a zero-based month, so we add 1
  const initialYear = currentDate.getFullYear();
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  useEffect(() => {
    // Find the saving for the selected month and year
    const saving = savingMoney.find(
      (saving) => saving.month === selectedMonth && saving.year === selectedYear
    );
    // If a saving was found, set the limit to its saving_target
    if (saving) {
      setLimit(saving.saving_target);
    }
  }, [selectedMonth, selectedYear, savingMoney]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      // Update the saving_target in the savingMoney array
      setSavingMoney((prevState) =>
        prevState.map((saving) =>
          saving.month === selectedMonth && saving.year === selectedYear
            ? { ...saving, saving_target: limit }
            : saving
        )
      );

      toast.success('Chỉnh sửa hạn mức thành công', {
        autoClose: 1500,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Modal
      title="Edit Saving Limit"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={400}
      className="py-4"
      zIndex={1001}
    >
      <div className="flex flex-col pb-4">
        <div className="flex flex-col ">
          <div className="flex flex-row items-center ml-4 mb-4 justify-between">
            <p className="whitespace-nowrap">Hạn mức</p>
            <Input
              className="w-3/5 mr-8"
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center ml-4 mb-4 justify-between">
            <p className="align-middle mr-2">Năm</p>
            <select
              className="border border-gray-300 bg-white rounded mr-8 p-2"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Array.from({ length: 11 }, (_, i) => i + 2020).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center ml-4 mb-4 justify-between">
            <p className="align-middle mr-2">Tháng</p>
            <select
              className="border border-gray-300 bg-white rounded mr-8 p-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSavingLimitModal;
