import React, { useState } from 'react';
import { DatePicker, Modal, Input } from 'antd';
import { money } from '~/utils';

const AddSaveModal = ({ isOpen, setModalOpen }) => {
  const { TextArea } = Input;
  const closeModal = () => {
    setModalOpen(false);
  };
  const [errors, setErrors] = useState({
    state: false,
  });

  if (!isOpen) {
    return null;
  }
  return (
    <Modal
      open={isOpen}
      onCancel={() => setModalOpen(false)}
      title={'Thêm khoản tiết kiệm'}
      width={525}
      centered
      afterClose={() => setErrors({ state: false })}
      className="custom-modal"
      zIndex={1005}
    >
      <div className="py-2 grid grid-cols-[120px_1fr] gap-y-4 items-center">
        <>
          <p className="text-base font-medium">Tiết kiệm trước:</p>
          <p>{money.formatVietnameseCurrency(100000000)}</p>
          <p className="text-base font-medium">Tiết kiệm sau:</p>
          <p>{money.formatVietnameseCurrency(100000000)}</p>
        </>

        <label className="text-base font-medium">Số tiền:</label>
        <Input placeholder="Amount" className="" name="amount" />
        <div></div>
        <div></div>

        <label className="text-base font-medium">Ngày:</label>
        <DatePicker
          style={{ width: '100%' }}
          onChange={(date) => {
            console.log(date);
          }}
          name="date"
        />
        <div></div>
        <div></div>

        <label className="text-base font-medium">Mô tả:</label>
        <TextArea
          rows={4}
          placeholder="Description"
          className=""
          name="description"
        />
        <div></div>
        <div></div>
      </div>
    </Modal>
  );
};

export default AddSaveModal;
