import React from 'react';
import { Button, Modal } from 'antd';
import useGlobalModalStore from '~/store/useGlobalModalStore';
import { formatDate } from '~/utils/time';
import { money, objUtils } from '~/utils';
import axiosClient from '~/axios';
import { userStateContext } from '~/contexts/ContextProvider';

const ReceiptsDetailModal = ({
  receipt,
  setEditModalOpen,
  deleteReceipt,
  open,
  setOpen,
}) => {
  const { fetchUser } = userStateContext();

  const [setConfirmModal, resetConfirmModal] = useGlobalModalStore((state) => [
    state.setConfirmModal,
    state.resetConfirmModal,
  ]);

  if (objUtils.isEmptyObject(receipt)) {
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
          {receipt?.name}
          {/* Luong hang thang */}
        </header>

        <div className="grid grid-cols-2 gap-4 pb-8">
          {/* Source */}
          <div className="text-center text-base font-medium truncate">
            Nguồn tiền
          </div>
          <div className="text-base text-center truncate">
            {receipt?.source}
            {/* Cong ty ABC */}
          </div>

          {/* Amount */}
          <div className="text-center text-base font-medium truncate">
            Số tiền
          </div>
          <div className="text-base text-center truncate">
            {money.formatVietnameseCurrency(receipt?.amount)}
            {/* 10.000.000 */}
          </div>

          {/* Date */}
          <div className="text-center text-base font-medium truncate">
            Thời gian
          </div>
          <div className="text-base text-center truncate">
            {formatDate(new Date(receipt?.date))}
            {/* 01/10/2023 */}
          </div>

          {/* Before balance */}
          <div className="text-center text-base font-medium truncate">
            Sô dư trước
          </div>
          <div className="text-base text-center truncate">
            {receipt?.prev_balance}
          </div>

          {/* After balance */}
          <div className="text-center text-base font-medium truncate">
            Số dư sau
          </div>
          <div className="text-base text-center truncate">
            {receipt?.new_balance}
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
                  deleteReceipt(receipt);
                  resetConfirmModal();
                  setTimeout(() => {
                    setOpen(false);
                  }, 0);

                  axiosClient
                    .delete(`/earning-money/${receipt.id}`)
                    .catch((error) => {
                      console.log(error);
                    })
                    .finally(() => {
                      fetchUser();
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
    </Modal>
  );
};

export default ReceiptsDetailModal;
