import { DatePicker, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

const EditReceiptModal = ({ receipt, open, setOpen }) => {
  // const [newReceipt, setNewReceipt] = useState(receipt);

  // useEffect(() => {
  //   setNewReceipt(receipt);
  // }, [receipt.id])

  return (
    <Modal
      // title={`Chỉnh sửa ${receipt.name}`}
      title="Chỉnh sửa khoản thu"
      open={open}
      centered
      onCancel={() => {}}
      onOk={() => {}}
      width={520}
      className="custom-modal"
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Name */}
          <div className="text-base font-medium truncate">Tên khoản thu</div>
          <div>
            <Input placeholder="Enter name here" />
          </div>

          {/* Source */}
          <div className="text-base font-medium truncate">Nguồn tiền</div>
          <div>
            <Input placeholder="Enter money source here" />
          </div>

          {/* Amount */}
          <div className="text-base font-medium truncate">Số tiền</div>
          <div>
            <Input placeholder="Enter amount here" />
          </div>

          {/* Date */}
          <div className="text-base font-medium truncate">Ngày</div>
          <div>
            <DatePicker style={{ width: '100%' }} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditReceiptModal;
