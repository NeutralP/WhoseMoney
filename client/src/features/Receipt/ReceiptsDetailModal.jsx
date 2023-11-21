import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import useGlobalModalStore from '~/store/useGlobalModalStore';
import EditReceiptModal from './EditReceiptModal';
import { formatDate } from '~/utils/time';
import { money, objUtils } from '~/utils';
import axiosClient from '~/axios';

const ReceiptsDetailModal = ({
  receipt,
  editReceipt,
  deleteReceipt,
  open,
  setOpen,
}) => {
  const [setConfirmModal, resetConfirmModal] = useGlobalModalStore((state) => [
    state.setConfirmModal,
    state.resetConfirmModal,
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [newReceipt, setNewReceipt] = useState(receipt);

  useEffect(() => {
    setNewReceipt(receipt);
  }, [receipt.id]);

  if (objUtils.isEmptyObject(newReceipt)) {
    return <></>;
  }

  return (
    <Modal
      width={480}
      title="Chi tiết khoản thu"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      className="custom-modal"
      footer={null}
      // zIndex={1000}
    >
      <div className="flex flex-col">
        <header className="text-xl font-medium flex items-center justify-center mt-2 mb-4">
          {newReceipt?.name}
          {/* Luong hang thang */}
        </header>

        <div className="grid grid-cols-2 gap-4 pb-8">
          {/* Source */}
          <div className="text-center text-base font-medium truncate">
            Nguồn tiền
          </div>
          <div className="text-base text-center truncate">
            {newReceipt?.source}
            {/* Cong ty ABC */}
          </div>

          {/* Amount */}
          <div className="text-center text-base font-medium truncate">
            Số tiền
          </div>
          <div className="text-base text-center truncate">
            {money.formatVietnameseCurrency(newReceipt?.amount)}
            {/* 10.000.000 */}
          </div>

          {/* Date */}
          <div className="text-center text-base font-medium truncate">
            Thời gian
          </div>
          <div className="text-base text-center truncate">
            {formatDate(new Date(newReceipt?.date))}
            {/* 01/10/2023 */}
          </div>

          {/* Before balance */}
          <div className="text-center text-base font-medium truncate">
            Sô dư trước
          </div>
          <div className="text-base text-center truncate">
            {/* {newReceipt?.before_balance} */}
            10.000.000
          </div>

          {/* After balance */}
          <div className="text-center text-base font-medium truncate">
            Số dư sau
          </div>
          <div className="text-base text-center truncate">
            {/* {newReceipt?.after_balance} */}
            20.000.000
          </div>
        </div>

        <footer className="flex items-center justify-center gap-4">
          <Button
            onClick={() =>
              setConfirmModal({
                open: true,
                title: 'Xác nhận xóa',
                content: 'Bạn có chắc muốn xóa khoản thu này?',
                handleCancel: () => resetConfirmModal(),
                handleOk: () => {
                  deleteReceipt(newReceipt);
                  resetConfirmModal();
                  setTimeout(() => {
                    setOpen(false);
                  }, 0);

                  axiosClient
                    .delete(`/earning-money/${newReceipt.id}`)
                    .catch((error) => {
                      console.log(error);
                    });
                },
              })
            }
            danger
            size="large"
          >
            Xóa
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => setEditModalOpen(true)}
          >
            Chỉnh sửa
          </Button>
        </footer>
      </div>

      <EditReceiptModal
        open={editModalOpen}
        receipt={receipt}
        newReceipt={newReceipt}
        setNewReceipt={setNewReceipt}
        setOpen={setEditModalOpen}
        editReceipt={editReceipt}
      />
    </Modal>
  );
};

export default ReceiptsDetailModal;
