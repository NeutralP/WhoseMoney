import { DatePicker, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const EditCategoryLimitModal = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
    console.log('Cancel');
  };

  const handleOk = () => {
    setOpen(false);
    console.log('Ok');
  };
  return (
    <Modal
      // title={`Chỉnh sửa ${receipt.name}`}
      title="Chỉnh sửa khoản thu"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={525}
      className="custom-modal"
      zIndex={1002}
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Name */}
          <div className="text-base font-medium truncate">Mức chi</div>
          <div>
            <Input placeholder="Enter name here" />
          </div>

          {/* Source */}
          <div className="text-base font-medium truncate" style={{width: 200}}>Hạn mức chi tiêu</div>
          <div>
            <Input placeholder="Enter money source here" />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryLimitModal;
