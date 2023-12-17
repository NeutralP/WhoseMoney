import React, { useEffect, useState } from 'react';
import { money } from '~/utils';
import { Card, Typography } from 'antd';
import NoData from '~/features/NoData/NoData';
import Fallback from '~/components/Fallback';
import useNotificationStore from '~/store/useNotificationStore';
import NotiDetailModal from '~/features/Notifications/NotiDetailModal';

const { Title } = Typography;

const Notifications = () => {
  const [notifications, fetchNotifications, fetchingNotifications] =
    useNotificationStore((state) => [
      state.notifications,
      state.fetchNotifications,
      state.fetchingNotifications,
    ]);

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedNoti, setSelectedNoti] = useState({});

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (fetchingNotifications) return <Fallback />;

  return (
    <div className="mt-8 mb-6 overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg flex-1 min-h-0 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-700">Thông báo</h2>
      <div className="mt-8 mb-4 flex-1 min-h-0 flex">
        <div className="w-full flex-1 min-h-0 flex flex-col overflow-auto">
          {notifications.map((item, index) => (
            <Card
              title={
                <Title className="mt-2" level={5}>
                  Cảnh báo
                </Title>
              }
              className="mb-8 text-base cursor-pointer"
              bordered={true}
              type="inner"
              extra={'Đã vượt hạn mức chi'}
              onClick={() => {
                setSelectedNoti(item);
                setTimeout(() => {
                  setDetailModalOpen(true);
                }, 0);
              }}
              key={index}
            >
              <div className="flex justify-between mb-2 mt-2">
                {item.notifiable_type.includes('Category') && (
                  <p>
                    Bạn đã tiêu hết 100% ngân sách của mình trong tháng này cho
                    mục{' '}
                    <span className="font-bold">{item.notifiable.name}</span>.
                    Điều này có thể ảnh hưởng đến khả năng tiết kiệm và đạt được
                    mục tiêu tài chính của bạn.
                  </p>
                )}
                {item.notifiable_type.includes('PayingMoney') && (
                  <p>
                    Bạn đã tiêu vượt ngưỡng so với số dư hiện có trong tài
                    khoản. Điều này có thể ảnh hưởng đến khả năng tiết kiệm và
                    đạt được mục tiêu tài chính của bạn.
                  </p>
                )}
              </div>
              {/* <div className="grid grid-cols-[200px_1fr] gap-y-4 items-center">
                <p>Hạn mức hiện tại:</p>
                <p>{money.formatVietnameseCurrency(0)}</p>
                <p>Đã chi tiêu:</p>
                <p>{money.formatVietnameseCurrency(0)}</p>
                <p>Vượt hạn mức:</p>
                <p>{money.formatVietnameseCurrency(0)}</p>
              </div> */}
            </Card>
          ))}
          {notifications.length === 0 && (
            <div className="w-full">
              <NoData />
            </div>
          )}
        </div>
      </div>

      <NotiDetailModal
        open={detailModalOpen}
        setOpen={setDetailModalOpen}
        noti={selectedNoti}
      />
    </div>
  );
};

export default Notifications;
