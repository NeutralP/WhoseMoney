import { Input } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { userStateContext } from '~/contexts/ContextProvider';
import usePayingMoneyStore from '~/store/usePayingMoneyStore';

// Use for both add and edit
const PayingMoneyModal = ({ type = 'add', open, setOpen, payingMoneyData }) => {
  const { currentUser } = userStateContext();

  const [udpatePayingMoney, createNewPayingMoney] = usePayingMoneyStore(
    (state) => [state.udpatePayingMoney, state.createNewPayingMoney]
  );

  const [newPayingMoney, setNewPayingMoney] = useState({
    name: '',
    amount: '',
    category_id: '',
    date: new Date(),
  });

  useEffect(() => {
    if (type === 'edit') {
      setNewPayingMoney({
        name: payingMoneyData.name,
        amount: payingMoneyData.amount,
        date: payingMoneyData.date,
        category_id: payingMoneyData.category_id,
      });
    }
  }, [type, payingMoneyData]);

  const handleOk = () => {
    if (type === 'add') {
      udpatePayingMoney(
        payingMoneyData.id,
        {
          ...newPayingMoney,
          user_id: currentUser.id,
        },
        setOpen
      );
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
      onClose={() => setOpen(false)}
      title={type === 'add' ? 'Add new paying money' : 'Edit paying money'}
      width={525}
      centered
      onOk={handleOk}
    >
      <div className="grid grid-cols-[120px_1fr] gap-y-3 items-center">
        {type === 'add' && (
          <>
            <p className="font-medium">Số dư trước:</p>
            <p>{currentUser.cur_balance}</p>
            <p className="font-medium">Số dư sau:</p>
            <p>{currentUser.cur_balance + parseInt(newPayingMoney.amount)}</p>
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
          onChange={(date) =>
            setNewPayingMoney({
              ...newPayingMoney,
              date: formatDate(date['$d']),
            })
          }
          value={dayjs(new Date(newPayingMoney.date))}
        />
      </div>
    </Modal>
  );
};

export default PayingMoneyModal;
