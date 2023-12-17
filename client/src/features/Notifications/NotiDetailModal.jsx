import { Button, Modal } from 'antd';
import React, { useMemo } from 'react';
import { money, objUtils } from '~/utils';

const NotiDetailModal = ({ noti, open, setOpen }) => {
  const type = useMemo(() => {
    if (objUtils.isEmptyObject(noti)) {
      return {};
    }
    return noti.notifiable_type;
  }, [noti.notifiable_type]);

  if (objUtils.isEmptyObject(noti)) {
    return <></>;
  }

  return (
    <Modal
      width={400}
      title="Cảnh báo"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      className="custom-modal"
      footer={null}
      // zIndex={1000}
    >
      <div className="flex flex-col">
        <header className="text-xl font-medium flex items-center justify-center mt-2 mb-4">
          {type.includes('PayingMoney') && 'Chi tiêu vượt quá số dư'}
          {type.includes('Category') &&
            `Đã vượt hạn mức chi của mục ${noti.notifiable.name}`}
        </header>

        {type.includes('PayingMoney') && (
          <div className="grid grid-cols-2 gap-4 items-center pb-6">
            <div className="text-left text-base font-medium truncate">
              {/* Số dư hiện tại */}
              Số dư trước
            </div>
            <div className="text-base text-right truncate">
              {money.formatVietnameseCurrency(noti.notifiable.prev_balance)}
            </div>
            <div className="text-left text-base font-medium truncate">
              {/* Số tiền còn thiếu */}
              Số dư sau
            </div>
            <div className="text-base text-right truncate">
              {money.formatVietnameseCurrency(noti.notifiable.new_balance)}
            </div>
          </div>
        )}
        {type.includes('Category') && (
          <div className="grid grid-cols-[200px_1fr] gap-y-4 items-center pb-6">
            <p className="text-base font-medium">Hạn mức hiện tại:</p>
            <p className="text-base text-right">
              {money.formatVietnameseCurrency(
                noti.notifiable.pay_limit[0].limit
              )}
            </p>
            <p className="text-base font-medium">Đã chi tiêu:</p>
            <p className="text-base text-right">
              {money.formatVietnameseCurrency(noti.notifiable.total_pay)}
            </p>
            <p className="text-base font-medium">Vượt hạn mức:</p>
            <p className="text-base text-right">
              {money.formatVietnameseCurrency(
                noti.notifiable.total_pay - noti.notifiable.pay_limit[0].limit
              )}
            </p>
          </div>
        )}

        <footer className="flex flex-col gap-4">
          <p className="text-center text-base">
            Bạn có muốn sử dụng tiền tiết kiệm không?
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={() => {}} size="large">
              Không
            </Button>
            <Button type="default" size="large" onClick={() => {}}>
              Có
            </Button>
          </div>
        </footer>
      </div>
    </Modal>
  );
};

export default NotiDetailModal;
