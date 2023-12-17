import React, { useState } from 'react';
import { DatePicker, Modal, Input } from 'antd';
import { money, shouldShowError } from '~/utils';
import useSavingStore from '~/store/useSavingStore';
import dayjs from 'dayjs';
import { formatDate } from '~/utils/time';

const { TextArea } = Input;

const defaultSaving = {
  amount: '',
  date: '',
  description: '',
};

const disabledDate = (current) => {
  // Can not select days before today and today
  return current < dayjs().startOf('day');
};

const AddSaveModal = ({
  isOpen,
  setModalOpen,
  selectedMonth,
  selectedYear,
}) => {
  const [saving, setSaving] = useState(defaultSaving);

  const [totalSaving] = useSavingStore((state) => [state.totalSaving]);

  const [
    createSavingMoney,
    createSavingMoneyErrors,
    setCreateSavingMoneyErrors,
  ] = useSavingStore((state) => [
    state.createSavingMoney,
    state.createSavingMoneyErrors,
    state.setCreateSavingMoneyErrors,
  ]);

  const closeModal = () => {
    setSaving(defaultSaving);
    setModalOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      onOk={() => {
        createSavingMoney(saving, setModalOpen, selectedMonth, selectedYear);
      }}
      title={'Thêm khoản tiết kiệm'}
      width={525}
      centered
      afterClose={() => setCreateSavingMoneyErrors({ state: false })}
      className="custom-modal"
      zIndex={1005}
    >
      <div className="py-2 grid grid-cols-[120px_1fr] gap-y-4 items-center">
        <>
          <p className="text-base font-medium">Tiết kiệm trước:</p>
          <p>{money.formatVietnameseCurrency(totalSaving || 0)}</p>
          <p className="text-base font-medium">Tiết kiệm sau:</p>
          <p>
            {money.formatVietnameseCurrency(
              Number(totalSaving || 0) + Number(saving.amount)
            )}
          </p>
        </>

        <label className="text-base font-medium">Số tiền:</label>
        <div>
          <Input
            placeholder="Amount"
            className=""
            name="amount"
            value={saving.amount}
            onChange={(e) =>
              setSaving({ ...saving, amount: Number(e.target.value) })
            }
            status={
              shouldShowError(
                createSavingMoneyErrors,
                'amount',
                saving.amount == 0 || saving.amount.length === 0
              ) && 'error'
            }
          />
          {shouldShowError(
            createSavingMoneyErrors,
            'amount',
            saving.amount == 0 || saving.amount.length === 0
          ) &&
            createSavingMoneyErrors.amount.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}
        </div>

        <div></div>
        <div></div>

        <label className="text-base font-medium">Ngày:</label>
        <div>
          <DatePicker
            disabledDate={disabledDate}
            style={{ width: '100%' }}
            onChange={(date) => {
              console.log(date);
              setSaving({
                ...saving,
                date: formatDate(date['$d']),
              });
            }}
            value={saving.date ? dayjs(new Date(saving.date)) : ''}
            name="date"
            status={
              shouldShowError(
                createSavingMoneyErrors,
                'date',
                saving.date.length === 0
              ) && 'error'
            }
          />
          {shouldShowError(
            createSavingMoneyErrors,
            'date',
            saving.date.length === 0
          ) &&
            createSavingMoneyErrors.date.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}
        </div>

        <div></div>
        <div></div>

        <label className="text-base font-medium">Mô tả:</label>
        <div>
          <TextArea
            rows={4}
            placeholder="Description"
            className=""
            name="description"
            value={saving.description}
            onChange={(e) =>
              setSaving({
                ...saving,
                description: e.target.value,
              })
            }
            status={
              shouldShowError(
                createSavingMoneyErrors,
                'description',
                saving.description.length === 0
              ) && 'error'
            }
          />
          {shouldShowError(
            createSavingMoneyErrors,
            'description',
            saving.description.length === 0
          ) &&
            createSavingMoneyErrors.description.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}
        </div>

        <div></div>
        <div></div>
      </div>
    </Modal>
  );
};

export default AddSaveModal;
