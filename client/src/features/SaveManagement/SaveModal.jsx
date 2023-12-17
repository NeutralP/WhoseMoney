import React from 'react';
import { Button, Modal } from 'antd';
import { money, objUtils } from '~/utils';
import NoData from '../NoData/NoData';

const SaveDetailModal = ({ saving, open, setOpen }) => {
  if (objUtils.isEmptyObject(saving)) return <></>;

  return (
    <Modal
      width={480}
      title={`Tháng ${saving.month} / ${saving.year}`}
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
          {saving.savings.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className={`text-left ${
                  item.amount < 0 ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {money.formatVietnameseCurrency(item.amount)}
              </div>
              <div className="text-left">{item.date}</div>
              <div className="text-left">{item.description}</div>
            </React.Fragment>
          ))}
        </div>
        {saving.savings.length === 0 && <NoData />}

        <footer className="flex items-center justify-center gap-4"></footer>
      </div>
    </Modal>
  );
};

export default SaveDetailModal;
