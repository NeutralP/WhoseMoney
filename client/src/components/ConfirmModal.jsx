import { Modal } from 'antd';
import React from 'react';

const ConfirmModal = ({ open, title, content, handleCancel, handleOk }) => {
  return (
    <Modal
      centered
      width={300}
      title={title}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      className="custom-modal"
      zIndex={9999}
    >
      {content}
    </Modal>
  );
};

export default ConfirmModal;
