import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { FaTrashAlt } from 'react-icons/fa';
import axiosClient from '~/axios';
import usePayingMoneyStore from '~/store/usePayingMoneyStore';
import { userStateContext } from '~/contexts/ContextProvider';

const ExpenseManagementDeleteAlert = ({ expense, deleteExpense }) => {
  const { fetchUser } = userStateContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [payingMoney, setPayingMoney] = usePayingMoneyStore((state) => [
    state.payingMoney,
    state.setPayingMoney,
  ]);

  const showModal = () => setIsModalVisible(true);

  const handleOk = () => {
    deleteExpense(expense);
    setIsModalVisible(false);

    axiosClient
      .delete(`paying-money/${expense.id}`)
      .then(() => {
        setPayingMoney(payingMoney.filter((item) => item.id !== expense.id));

        // toast.success('Xóa khoản chi thành công.', {
        //   autoClose: 1500,
        // });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Xóa khoản chi thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {
        fetchUser();
      });
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
