import { DatePicker, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { userStateContext } from '~/contexts/ContextProvider';
import useCategoryStore from '~/store/useCategoryStore';
import usePayingMoneyStore from '~/store/usePayingMoneyStore';
import { objUtils } from '~/utils';
import { formatDate } from '~/utils/time';

// Use for both add and edit
const PayingMoneyModal = ({
  type = 'add',
  open,
  setOpen,
  payingMoneyData = {},
  setDetailModalOpen = () => {},
}) => {
  const { currentUser } = userStateContext();

  const [udpatePayingMoney, createNewPayingMoney] = usePayingMoneyStore(
    (state) => [state.udpatePayingMoney, state.createNewPayingMoney]
  );

  const [categories] = useCategoryStore((state) => [state.categories]);

  const [newPayingMoney, setNewPayingMoney] = useState({
    name: '',
    amount: '0',
    category_id: '',
    date: new Date(),
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
    if (type === 'edit') {
      udpatePayingMoney(
        payingMoneyData.id,
        {
          ...newPayingMoney,
          user_id: currentUser.id,
        },
        setOpen
      );
      setDetailModalOpen(false);
    } else {
      createNewPayingMoney(
        {
          ...newPayingMoney,
          user_id: currentUser.id,
        },
        setOpen
      );
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
          value={newPayingMoney.name}
          onChange={(e) =>
            setNewPayingMoney({ ...newPayingMoney, name: e.target.value })
          }
        />
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
          </>
        )}
        <label className="text-base font-medium">Số tiền:</label>
        <Input
          placeholder="Amount"
          className=""
          value={newPayingMoney.amount}
          onChange={(e) =>
            setNewPayingMoney({ ...newPayingMoney, amount: e.target.value })
          }
        />
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
        />
      </div>
    </Modal>
  );
};

export default PayingMoneyModal;
