import { DatePicker, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import axiosClient from '~/axios';
import { userStateContext } from '~/contexts/ContextProvider';
import useCategoryStore from '~/store/useCategoryStore';
import usePayingMoneyStore from '~/store/usePayingMoneyStore';
import { objUtils, shouldShowError } from '~/utils';
import { formatDate } from '~/utils/time';

// Use for both add and edit
const PayingMoneyModal = ({
  type = 'add',
  open,
  setOpen,
  payingMoneyData = {},
  setDetailModalOpen = () => {},
  openFromCategory = false,
  setCategoryDetailModalOpen = () => {},
}) => {
  const { currentUser, fetchUser } = userStateContext();

  const [payingMoney, setPayingMoney] = usePayingMoneyStore((state) => [
    state.payingMoney,
    state.setPayingMoney,
  ]);

  const [categories, fetchCategories] = useCategoryStore((state) => [
    state.categories,
    state.fetchCategories,
  ]);

  const [newPayingMoney, setNewPayingMoney] = useState({
    name: '',
    amount: '0',
    category_id: '',
    date: new Date(),
  });

  const [errors, setErrors] = useState({
    state: false,
  });

  const categoriesOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  useEffect(() => {
    if (type === 'edit' && !objUtils.isEmptyObject(payingMoneyData)) {
      setNewPayingMoney({
        name: payingMoneyData.name,
        amount: payingMoneyData.amount,
        date: payingMoneyData.date,
        category_id: payingMoneyData.category_id,
      });
    }
  }, [type, payingMoneyData]);

  const handleOk = () => {
    const payload = {
      ...newPayingMoney,
      user_id: currentUser.id,
    };

    if (type === 'edit') {
      const id = payingMoneyData?.id;
      axiosClient
        .patch(`paying-money/${id}`, payload)
        .then(({ data }) => {
          setPayingMoney(
            payingMoney.map((item) => (item.id === id ? data.data : item))
          );

          toast.success('Chỉnh sửa khoản chi thành công.', {
            autoClose: 1500,
          });

          setOpen(false);
          fetchUser();
          if (openFromCategory) {
            fetchCategories();
            setCategoryDetailModalOpen(false);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const responseErrors = error.response.data.errors;

            let errors = {
              name: responseErrors.name || [],
              amount: responseErrors.amount || [],
              category: responseErrors.category_id || [],
              date: responseErrors.date || [],
              state: true,
            };

            setErrors(errors);
          }

          console.log(error);
          toast.error('Chỉnh sửa khoản chi thất bại.', {
            autoClose: 1500,
          });
        })
        .finally(() => {});
      setDetailModalOpen(false);
    } else {
      axiosClient
        .post('paying-money', payload)
        .then(({ data }) => {
          setPayingMoney([data.data, ...payingMoney]);

          toast.success('Thêm khoản chi thành công.', {
            autoClose: 1500,
          });

          setOpen(false);
          fetchUser();
        })
        .catch((error) => {
          if (error.response && error.response.status === 422) {
            const responseErrors = error.response.data.errors;

            let errors = {
              name: responseErrors.name || [],
              amount: responseErrors.amount || [],
              category: responseErrors.category_id || [],
              date: responseErrors.date || [],
              state: true,
            };

            setErrors(errors);
          }

          console.log(error);
          toast.error('Thêm khoản chi thất bại.', {
            autoClose: 1500,
          });
        })
        .finally(() => {});
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      title={type === 'add' ? 'Add new paying money' : 'Edit paying money'}
      width={525}
      centered
      onOk={handleOk}
      afterClose={() => setErrors({ state: false })}
      className="custom-modal"
      zIndex={1005}
    >
      <div className="py-2 grid grid-cols-[120px_1fr] gap-y-4 items-center">
        {type === 'add' && (
          <>
            <p className="text-base font-medium">Số dư trước:</p>
            <p>{currentUser.cur_balance}</p>
            <p className="text-base font-medium">Số dư sau:</p>
            <p>{currentUser.cur_balance - Number(newPayingMoney.amount)}</p>
          </>
        )}
        <label className="text-base font-medium">Tên khoản chi:</label>
        <Input
          placeholder="Name"
          className=""
          name="name"
          value={newPayingMoney.name}
          onChange={(e) =>
            setNewPayingMoney({ ...newPayingMoney, name: e.target.value })
          }
          status={
            shouldShowError(errors, 'name', newPayingMoney.name.length === 0) &&
            'error'
          }
        />
        <div></div>
        <div>
          {shouldShowError(errors, 'name', newPayingMoney.name.length === 0) &&
            errors.name.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}
        </div>
        {type === 'add' && (
          <>
            <label className="text-base font-medium">Danh mục:</label>
            <Select
              allowClear
              style={{ width: '100%' }}
              placeholder="Select category"
              options={categoriesOptions}
              onChange={(value) =>
                setNewPayingMoney({ ...newPayingMoney, category_id: value })
              }
              value={newPayingMoney.category_id}
            />
            <div></div>
            <div>
              {shouldShowError(
                errors,
                'category',
                newPayingMoney.category_id.length === 0
              ) &&
                errors.category.map((error, index) => (
                  <p className="text-sm text-red-600 mt-2" key={index}>
                    {error}
                  </p>
                ))}
            </div>
          </>
        )}
        <label className="text-base font-medium">Số tiền:</label>
        <Input
          placeholder="Amount"
          className=""
          value={newPayingMoney.amount}
          name="amount"
          onChange={(e) =>
            setNewPayingMoney({ ...newPayingMoney, amount: e.target.value })
          }
          status={
            shouldShowError(
              errors,
              'amount',
              newPayingMoney.amount.length === 0
            ) && 'error'
          }
        />
        <div></div>
        <div>
          {shouldShowError(
            errors,
            'amount',
            newPayingMoney.amount.length === 0
          ) &&
            errors.amount.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}
        </div>

        <label className="text-base font-medium">Ngày:</label>
        <DatePicker
          style={{ width: '100%' }}
          onChange={(date) => {
            console.log(date);
            setNewPayingMoney({
              ...newPayingMoney,
              date: formatDate(date['$d']),
            });
          }}
          value={dayjs(new Date(newPayingMoney.date))}
          name="date"
          status={
            shouldShowError(errors, 'date', newPayingMoney.date.length === 0) &&
            'error'
          }
        />
        <div></div>
        <div>
          {shouldShowError(errors, 'date', newPayingMoney.date.length === 0) &&
            errors.date.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}
        </div>
      </div>
    </Modal>
  );
};

export default PayingMoneyModal;
