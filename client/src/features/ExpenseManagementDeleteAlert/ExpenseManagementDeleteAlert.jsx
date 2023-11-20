import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ExpenseManagementDeleteAlert = ({ expense, deleteExpense }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);

    const handleOk = () => {
        deleteExpense(expense);
        setIsModalVisible(false);
    };

    const handleCancel = () => setIsModalVisible(false);

    return (
        <>
            <Button onClick={showModal} type="primary" danger>
                Xóa
            </Button>
            <Modal
                title="Xóa khoản chi"
                centered
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { margin: '0 10px' } }} // Add margin to the OK button
                cancelButtonProps={{ style: { margin: '0 10px' } }} // Add margin to the Cancel button
            >
                <p style={{margin: '0 16px'}}>Bạn có chắc chắn muốn xóa khoản chi này không?</p>
            </Modal>
        </>
    );
}

export default ExpenseManagementDeleteAlert;