import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaTrashAlt } from 'react-icons/fa';
import axiosClient from '~/axios';

const ExpenseManagementDeleteAlert = ({ expense, deleteExpense }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    deleteExpense(expense);
    setIsModalVisible(false);

    // axiosClient.delete(`/paying-money/${expense.id}`).catch((error) => {
    //   console.error(error);
    // });
  };

  const handleCancel = () => setIsModalVisible(false);

  return (
    <>
      <Button onClick={showModal} type="primary" danger>
        <FaTrashAlt />
      </Button>
      <Modal
        title="Xóa khoản chi"
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
        <p>Bạn có chắc chắn muốn xóa khoản chi này không?</p>
      </Modal>
    </>
  );
};

export default ExpenseManagementDeleteAlert;
