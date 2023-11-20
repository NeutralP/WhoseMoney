import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const ReceiptManagementDeleteAlert = ({ receipt, deleteReceipt }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);

    const handleOk = () => {
        deleteReceipt(receipt);
        setIsModalVisible(false);
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
                cancelButtonProps={{ style: { margin: '0 10px', color: 'white'}, type: 'danger'}} // Add margin to the Cancel button
            >
                <p style={{margin: '0 16px'}}>Bạn có chắc chắn muốn xóa khoản thu này không?</p>
            </Modal>
        </>
    );
}

export default ReceiptManagementDeleteAlert;