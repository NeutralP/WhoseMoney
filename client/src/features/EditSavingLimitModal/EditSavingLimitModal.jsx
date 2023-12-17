import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import useSavingStore from '~/store/useSavingStore';
import { shouldShowError } from '~/utils';

const EditSavingLimitModal = ({
  open,
  setOpen,
  targetId,
  selectedMonthTarget,
  selectedMonth,
  selectedYear,
}) => {
  const [targetErrors, createSavingTarget, updateSavingTarget] = useSavingStore(
    (state) => [
      state.targetErrors,
      state.createSavingTarget,
      state.updateSavingTarget,
    ]
  );

  const [target, setTarget] = useState({
    target: 0,
    month: selectedMonth,
    year: selectedYear,
  });

  useEffect(() => {
    selectedMonthTarget &&
      setTarget({
        target: selectedMonthTarget,
        month: selectedMonth,
        year: selectedYear,
      });
  }, [selectedMonthTarget]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if (targetId) {
      updateSavingTarget(
        targetId,
        target,
        selectedMonth,
        selectedYear,
        setOpen
      );
    } else {
      createSavingTarget(target, selectedMonth, selectedYear, setOpen);
    }
  };

  return (
    <Modal
      title="Cài đặt hạn mức"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={400}
      className="custom-modal"
      zIndex={1001}
    >
      <div className="flex flex-col py-4">
        <div className="flex flex-col ">
          <div className="flex flex-row items-center w-full mb-4 justify-between">
            <p className="whitespace-nowrap">Hạn mức</p>
            <div>
              <Input
                className="w-full"
                type="number"
                value={target.target}
                onChange={(e) =>
                  setTarget({ ...target, target: Number(e.target.value) })
                }
                status={
                  shouldShowError(
                    targetErrors,
                    'target',
                    Number(target.target) === 0
                  ) && 'error'
                }
              />
              {shouldShowError(
                targetErrors,
                'target',
                Number(target.target) === 0
              ) &&
                targetErrors.target.map((error, index) => (
                  <p className="text-sm text-red-600 mt-2" key={index}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="flex flex-row items-center w-full mb-4 justify-between">
            <p className="align-middle mr-2">Năm</p>
            <select
              className="border border-gray-300 bg-white rounded p-2"
              value={selectedYear}
              onChange={(e) => setTarget({ ...target, year: e.target.value })}
            >
              {Array.from({ length: 11 }, (_, i) => selectedYear + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="flex flex-row items-center w-full justify-between">
            <p className="align-middle mr-2">Tháng</p>
            <select
              className="border border-gray-300 bg-white rounded p-2"
              value={selectedMonth}
              onChange={(e) => setTarget({ ...target, month: e.target.value })}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditSavingLimitModal;
