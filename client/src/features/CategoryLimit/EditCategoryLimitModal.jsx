import { Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import axiosClient from '~/axios';
import useCategoryStore from '~/store/useCategoryStore';

const numberOfDaysInCurrentMonth = dayjs().daysInMonth();

const EditCategoryLimitModal = ({
  category,
  selectedMonth,
  selectedYear,
  payLimit,
  open,
  setOpen,
  setDetailModalOpen,
}) => {
  const [fetchCategories] = useCategoryStore((state) => [
    state.fetchCategories,
  ]);

  const [limit, setLimit] = useState(payLimit);

  // True - Days | False - Month
  const [mode, setMode] = useState(false);

  useEffect(() => {
    setLimit(payLimit);
  }, [payLimit]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    axiosClient
      .patch(`categories/${category.id}/pay_limit`, {
        month: selectedMonth,
        year: selectedYear,
        limit: mode ? limit * numberOfDaysInCurrentMonth : limit,
      })
      .then(() => {
        fetchCategories();
        toast.success('Chỉnh sửa hạn mức thành công', {
          autoClose: 1500,
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setOpen(false);
        setTimeout(() => {
          setDetailModalOpen(false);
        }, 0);
      });
  };

  return (
    <Modal
      title="Chỉnh sửa hạn mức"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={525}
      className="custom-modal"
      zIndex={1002}
    >
      <div className="flex flex-col pb-4">
        <h2 className="text-center text-lg font-medium mb-6">
          {category.name}
        </h2>
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          <label className="block mb-1 font-bold">Mức chi / Ngày</label>
          <Input
            onChange={(e) => setLimit(Number(e.target.value))}
            type="text"
            name="limit"
            placeholder="Nhập số tiền"
            value={
              !mode ? Math.round(limit / numberOfDaysInCurrentMonth) : limit
            }
            disabled={!mode}
          />

          <div></div>
          <div className="cursor-pointer flex items-center justify-center">
            <HiOutlineSwitchVertical
              onClick={() => setMode(!mode)}
              className="text-xl"
            />
          </div>

          <label className="block mb-1 font-bold">Mức chi / Tháng</label>
          <Input
            onChange={(e) => setLimit(Number(e.target.value))}
            type="text"
            name="limit"
            placeholder="Nhập số tiền"
            value={mode ? limit * numberOfDaysInCurrentMonth : limit}
            disabled={mode}
            status={limit === '0' && 'error'}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryLimitModal;
