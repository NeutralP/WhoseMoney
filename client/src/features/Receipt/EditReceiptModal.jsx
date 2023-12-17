import { DatePicker, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from '~/axios';
import { userStateContext } from '~/contexts/ContextProvider';
// import useGlobalModalStore from '~/store/useGlobalModalStore';
import { objUtils, shouldShowError } from '~/utils';
import { formatDate } from '~/utils/time';

const disabledDate = (current) => {
  // Can not select days before today and today
  return current < dayjs().startOf('day');
};

const defaultReceipt = {
  name: '',
  source: '',
  date: '',
  amount: '',
};

const EditReceiptModal = ({
  receipt,
  setSelectedReceipt,
  editReceipt,
  open,
  setOpen,
}) => {
  const { fetchUser } = userStateContext();

  const [newReceipt, setNewReceipt] = useState({
    ...defaultReceipt,
    ...receipt,
  });

  // const [setConfirmModal, resetConfirmModal] = useGlobalModalStore((state) => [
  //   state.setConfirmModal,
  //   state.resetConfirmModal,
  // ]);

  const [errors, setErrors] = useState({ state: false });

  useEffect(() => {
    !objUtils.isEmptyObject(receipt) && setNewReceipt(receipt);
  }, [receipt]);

  const handleCancel = () => {
    // if (objUtils.compareObj(receipt, newReceipt)) {
    //   setConfirmModal({
    //     open: true,
    //     title: 'Hủy thay đổi',
    //     content: 'Sau khi hủy những thông tin đã điền sẽ không được lưu.',
    //     handleCancel: () => resetConfirmModal(),
    //     handleOk: () => {
    //       resetConfirmModal();
    //       setTimeout(() => {
    //         setOpen(false);
    //       }, 0);
    //     },
    //   });
    // } else
    setOpen(false);
  };

  const handleOk = () => {
    newReceipt.amount = Number(newReceipt.amount);
    axiosClient
      .patch(`/earning-money/${receipt.id}`, newReceipt)
      .then(() => {
        setSelectedReceipt(newReceipt);
        editReceipt(newReceipt);
        setOpen(false);

        fetchUser();
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;

          let errors = {
            name: responseErrors.name || [],
            source: responseErrors.source || [],
            date: responseErrors.date || [],
            amount: responseErrors.amount || [],
            state: true,
          };

          setErrors(errors);
        }
        console.error(error);

        toast.error('Chỉnh sửa khoản thu thất bại.', {
          autoClose: 1500,
        });
      });
  };

  if (objUtils.isEmptyObject(receipt) || receipt.id == null) return <></>;

  return (
    <Modal
      // title={`Chỉnh sửa ${receipt.name}`}
      title="Chỉnh sửa khoản thu"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={525}
      className="custom-modal"
      zIndex={1002}
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Name */}
          <div className="text-base font-medium truncate">Tên khoản thu</div>
          <div>
            <Input
              placeholder="Enter name here"
              value={newReceipt.name}
              onChange={(e) =>
                setNewReceipt({ ...newReceipt, name: e.target.value })
              }
              status={
                shouldShowError(errors, 'name', newReceipt.name.length === 0) &&
                'error'
              }
            />
            {shouldShowError(errors, 'name', newReceipt.name.length === 0) &&
              errors.name.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
          </div>

          {/* Source */}
          <div className="text-base font-medium truncate">Nguồn tiền</div>
          <div>
            <Input
              placeholder="Enter money source here"
              value={newReceipt.source}
              onChange={(e) =>
                setNewReceipt({ ...newReceipt, source: e.target.value })
              }
              status={
                shouldShowError(
                  errors,
                  'source',
                  newReceipt.source.length === 0
                ) && 'error'
              }
            />
            {shouldShowError(
              errors,
              'source',
              newReceipt.source.length === 0
            ) &&
              errors.source.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
          </div>

          {/* Amount */}
          <div className="text-base font-medium truncate">Số tiền</div>
          <div>
            <Input
              placeholder="Enter amount here"
              value={newReceipt.amount}
              onChange={(e) =>
                setNewReceipt({ ...newReceipt, amount: e.target.value })
              }
              status={
                shouldShowError(
                  errors,
                  'amount',
                  newReceipt.amount.length === 0
                ) && 'error'
              }
            />
            {shouldShowError(
              errors,
              'amount',
              newReceipt.amount.length === 0
            ) &&
              errors.amount.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
          </div>

          {/* Date */}
          <div className="text-base font-medium truncate">Ngày</div>
          <div>
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={disabledDate}
              onChange={(date) => {
                console.log(date);
                setNewReceipt({ ...newReceipt, date: formatDate(date['$d']) });
              }}
              value={dayjs(new Date(newReceipt.date))}
              status={
                shouldShowError(errors, 'date', newReceipt.date.length === 0) &&
                'error'
              }
            />
            {shouldShowError(errors, 'date', newReceipt.date.length === 0) &&
              errors.date.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditReceiptModal;
