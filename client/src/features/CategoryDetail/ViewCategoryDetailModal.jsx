import { DatePicker, Input, Modal, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

// Use for both add and edit
const ViewCategoryDetailModal = ({ open, setOpen }) => {
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
      title={''}
      open={open}
      onCancel={handleCancel}
      width={525}
      centered
      onOk={handleOk}
      className="custom-modal"
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Amount */}
          <div className="text-base font-medium truncate">Hạn mức</div>
          <div className="text-base truncate">
            {/* {hạn mức} */}
            5.000.000VND
          </div>
          <div className="text-base font-medium truncate">Số tiền đã chi</div>
          <div className="text-base truncate">
            {/* {số tiền đã chi} */}
            1.000.000VNĐ
          </div>
          <div className="text-base font-medium truncate">Số tiền còn dư</div>
          <div className="text-base truncate">
            {/* {số tiền còn dư} */}
            2.000.000VNĐ
          </div>
          <div className="text-base font-medium truncate">Quá trình</div>
          <div className="text-base truncate">
            {/* {quá trình là gì?} */}
            30%
          </div>
        </div>
        <footer className="flex items-center justify-center gap-4">
          <Button
            type="default"
            size="large"
            onClick={() => setEditModalOpen(true)}
          >
            Chỉnh sửa
          </Button>
        </footer>
      </div>
    </Modal>
  );
};

export default ViewCategoryDetailModal;
