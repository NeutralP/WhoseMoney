import { DatePicker, Input, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from '~/axios';
import useEarningStore from '~/store/useEarningStore';
import { shouldShowError } from '~/utils';

const disabledDate = (current) => {
  // Can not select days before today and today
  return current < dayjs().startOf('day');
};

const CreateEarningTargetModal = ({
  prevTarget,
  selectedMonth,
  selectedYear,
  open,
  setOpen,
}) => {
  const [fetchTargets] = useEarningStore((state) => [state.fetchTargets]);

  const [target, setTarget] = useState({
    target: prevTarget.target,
    month: selectedMonth,
    year: selectedYear,
  });
  const [errors, setErrors] = useState({ state: false });

  useEffect(() => {
    setTarget({
      target: prevTarget.target,
      month: selectedMonth,
      year: selectedYear,
    });
  }, [prevTarget, selectedMonth, selectedYear]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if (prevTarget.id != null) {
      axiosClient
        .patch(`/earning-targets/${prevTarget.id}`, target)
        .then(() => {
          fetchTargets();

          toast.success('Thay đổi mục tiêu thành công.', {
            autoClose: 1500,
          });

          setOpen(false);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const responseErrors = error.response.data.errors;

            let errors = {
              target: responseErrors.target || [],
              month: responseErrors.month || [],
              year: responseErrors.year || [],
              state: true,
            };

            setErrors(errors);
          }
          console.error(error);
          toast.error('Cài đặt mục tiêu thất bại.', {
            autoClose: 1500,
          });
        });
    } else {
      axiosClient
        .post('/earning-targets', target)
        .then(({}) => {
          fetchTargets();

          toast.success('Cài đặt mục tiêu thành công.', {
            autoClose: 1500,
          });

          setOpen(false);
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const responseErrors = error.response.data.errors;

            let errors = {
              target: responseErrors.target || [],
              month: responseErrors.month || [],
              year: responseErrors.year || [],
              state: true,
            };

            setErrors(errors);
          }
          console.error(error);
          toast.error('Cài đặt mục tiêu thất bại.', {
            autoClose: 1500,
          });
        });
    }
  };

  return (
    <Modal
      title="Thay đổi mục tiêu"
      open={open}
      centered
      onCancel={handleCancel}
      onOk={handleOk}
      width={520}
      className="custom-modal"
    >
      <div className="flex flex-col pt-6 pb-4">
        <div className="grid grid-cols-[120px_1fr] gap-6 items-center">
          {/* Amount */}
          <div className="text-base font-medium truncate">Mục tiêu</div>
          <div>
            <Input
              placeholder="Enter amount here"
              value={target.target}
              onChange={(e) =>
                setTarget({ ...target, target: Number(e.target.value) })
              }
              status={
                shouldShowError(
                  errors,
                  'target',
                  Number(target.target) === 0
                ) && 'error'
              }
            />
            {shouldShowError(errors, 'target', Number(target.target) === 0) &&
              errors.target.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
          </div>
          <div className="text-base font-medium truncate">Thời gian</div>
          <div>
            <DatePicker
              disabledDate={disabledDate}
              className="w-full"
              format="DD/MM/YYYY"
              picker="month"
              onChange={(date) => {
                console.log(date['$d'].getMonth(), date['$d'].getFullYear());
                setTarget({
                  ...target,
                  month: date['$d'].getMonth(),
                  year: date['$d'].getFullYear(),
                });
              }}
              value={dayjs(new Date(selectedYear, selectedMonth - 1))}
              status={shouldShowError(errors, 'month', true) && 'error'}
            />
            {shouldShowError(errors, 'month', true) &&
              errors.month.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
            {shouldShowError(errors, 'year', true) &&
              errors.year.map((error, index) => (
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

export default CreateEarningTargetModal;
