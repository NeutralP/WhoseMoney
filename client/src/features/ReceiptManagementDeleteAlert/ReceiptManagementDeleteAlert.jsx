import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import axiosClient from '~/axios';

const ReceiptManagementDeleteAlert = ({ receipt, deleteReceipt }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    deleteReceipt(receipt);
    setIsModalVisible(false);

    axiosClient.delete(`/earning-money/${receipt.id}`).catch((error) => {
      console.error(error);
    });
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <Button onClick={showModal} type="primary" danger>
        Xóa
      </Button>
      <Modal
        title="Xóa khoản thu"
        centered
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ style: { margin: '0 10px' } }} // Add margin to the OK button
        cancelButtonProps={{
          style: { margin: '0 10px', backgroundColor: 'white' },
        }} // Add margin to the Cancel button
        className="custom-modal"
      >
        <p>Bạn có chắc chắn muốn xóa khoản thu này không?</p>
      </Modal>
    </>
  );
};

export default ReceiptManagementDeleteAlert;
