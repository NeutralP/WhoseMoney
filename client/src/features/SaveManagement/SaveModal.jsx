import React from 'react';
import { Button, Modal } from 'antd';
import { money } from '~/utils';

const SaveDetailModal = ({ month, year, open, setOpen }) => {
  const saving = [
    { amount: 10000000, date: '01/10/2023', description: 'Tiết kiệm 1' },
    {
      amount: 15000000,
      date: '03/10/2023',
      description: 'Mua điện thoại',
    },
    { amount: -5000000, date: '28/10/2023', description: 'Nộp viện phí' },
  ];
  return (
    <Modal
      width={480}
      title={`Tháng ${month} / ${year}`}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      className="custom-modal"
      footer={null}
      // zIndex={1000}
    >
      <div className="flex flex-col">
        <header className="text-xl font-medium flex items-center justify-center mt-2 mb-4">
          Tổng tiết kiệm tháng:
        </header>

        <div className="grid grid-cols-3 gap-4 bg-gray-200 p-4 rounded-md shadow-md">
          <div className="font-bold text-left">Số tiền</div>
          <div className="font-bold text-left">Ngày</div>
          <div className="font-bold text-left">Mô tả</div>
          {saving.map((saving, index) => (
            <React.Fragment key={index}>
              <div
                className={`text-left ${
                  saving.amount < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {money.formatVietnameseCurrency(saving.amount)}
              </div>
              <div className="text-left">{saving.date}</div>
              <div className="text-left">{saving.description}</div>
            </React.Fragment>
          ))}
        </div>

        <footer className="flex items-center justify-center gap-4"></footer>
      </div>
    </Modal>
  );
};

export default SaveDetailModal;
