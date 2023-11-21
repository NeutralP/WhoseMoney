import { DatePicker, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const CreateEarningTargetModal = ({ open, setOpen, children }) => {
  // const [newReceipt, setNewReceipt] = useState(receipt);

  // useEffect(() => {
  //   setNewReceipt(receipt);
  // }, [receipt.id])
 
  // const [setTarget]

  const handleCancel = () => {
    setOpen(false);
  }

  const handleOk = () => {
    setOpen(false);
  }

  return (
    <Modal
      // title={`Chỉnh sửa ${receipt.name}`}
      title="Thay đổi mục tiêu"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={520}
      className="custom-modal"
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Name */}
          <div className="text-base font-medium truncate">
            Mục tiêu
          </div>
          <div>
            <Input placeholder="Enter name here" />
          </div>

          <div className="text-base font-medium truncate">
            Thời gian
          </div>
          <div className="text-base truncate">
            {/* {receipt.date} */}
            10/2023
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateEarningTargetModal;
