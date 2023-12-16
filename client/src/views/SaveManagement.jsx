import React, { useEffect, useState, useMemo } from 'react';
import { money } from '~/utils';
import { getDateLeftInCurrentMonth } from '~/utils/time';
import { Card, Typography } from 'antd';
import ProgressBar from '~/features/EarningTarget/ProgressBar';
import NoData from '~/features/NoData/NoData';
import SaveDetailModal from '~/features/SaveManagement/SaveModal';
import AddSaveModal from '~/features/SaveManagement/AddSaveModal';
import EditSavingLimitModal from '~/features/EditSavingLimitModal/EditSavingLimitModal';
import useSavingStore from '~/store/useSavingStore';
import Fallback from '~/components/Fallback';

const { Title } = Typography;

const SaveManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredSavings, setFilteredSavings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editSavingLimitModal, setEditSavingLimitModal] = useState(false);

  const [
    savingMoney,
    setSavingMoney,
    fetchingSavingMoney,
    fetchSavingMoneyByMonth,
  ] = useSavingStore((state) => [
    state.savingMoney,
    state.setSavingMoney,
    state.fetchingSavingMoney,
    state.fetchSavingMoneyByMonth,
  ]);

  useEffect(() => {
    fetchSavingMoneyByMonth(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    const newFilteredSavings = savingMoney.filter((savingMoney) => {
      return (
        (selectedMonth ? savingMoney.month === selectedMonth : true) &&
        (selectedYear ? savingMoney.year === selectedYear : true)
      );
    });
    setFilteredSavings(newFilteredSavings);
  }, [savingMoney, selectedMonth, selectedYear]);

  const thisMonthSavingMoney = useMemo(() => {
    return (
      savingMoney.find(
        (saving) =>
          saving.month === selectedMonth && saving.year === selectedYear
      ) ?? {
        amount: 0,
        target: 0,
      }
    );
  }, [savingMoney, selectedMonth, selectedYear]);

  const percentage = useMemo(() => {
    if (thisMonthSavingMoney.amount === 0) return 0;
    const value = Math.round(
      (thisMonthSavingMoney.amount / thisMonthSavingMoney.target) * 100
    );
    return value;
  }, [thisMonthSavingMoney]);
  const testData = [{ bgcolor: '#1677ff', completed: percentage }];

  const calculateTotalAmount = () => {
    return savingMoney.reduce((acc, saving) => {
      const amount = saving.amount;
      return acc + amount;
    }, 0);
  };

  if (fetchingSavingMoney) {
    return <Fallback />;
  }

  return (
    <div className="mt-8 overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">
        Quản lý tiết kiệm
      </h2>
      <div className="flex container justify-between mb-3">
        <p className="">
          Tổng tiền tiết kiệm:{' '}
          {/* {money.formatVietnameseCurrency(calculateTotalAmount())} */}
        </p>
        <p className="">
          Số ngày còn lại trong tháng: {getDateLeftInCurrentMonth()}
        </p>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="">
            Tiết kiệm tháng này:{' '}
            {/* {money.formatVietnameseCurrency(thisMonthSavingMoney.amount)} */}
          </p>
        </div>
        <div>
          <p className="">
            Hạn mức tháng này:{' '}
            {/* {money.formatVietnameseCurrency(thisMonthSavingMoney.target)} */}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div>
          <div style={{ width: '200px' }}>
            {testData.map((item, idx) => (
              <ProgressBar
                key={idx}
                bgcolor={item.bgcolor}
                completed={item.completed}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="align-middle mr-2">Lọc theo tháng: </p>
          <select
            className="border border-gray-300 bg-white rounded mr-2 p-2"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            <option value="">Tháng</option>
            {[...Array(12).keys()].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 bg-white rounded p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            <option className="bg-white" value="">
              Năm
            </option>
            {[...Array(10).keys()].map((_, i) => (
              <option key={i} value={new Date().getFullYear() - i}>
                {new Date().getFullYear() - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-12  mb-4">
        <div className="w-full h-96 flex flex-col overflow-auto">
          {filteredSavings.map((saving) => (
            <Card
              title={
                <Title className="mt-2" level={5}>
                  Tháng {saving.month} / {saving.year}
                </Title>
              }
              className="mb-8 text-base"
              bordered={true}
              type="inner"
              extra={
                saving.month === new Date().getMonth() + 1 &&
                saving.year === new Date().getFullYear()
                  ? `Còn lại ${getDateLeftInCurrentMonth()} ngày`
                  : 'Hoàn thành'
              }
              onClick={() => {
                setDetailModalOpen(true);
              }}
            >
              <div className="flex justify-between mb-2 mt-2">
                <p>
                  Tổng tiền tiết kiệm:{' '}
                  {/* {money.formatVietnameseCurrency(saving.amount)} */}
                </p>
                <span>
                  {/* {Math.round((saving.amount * 100) / saving.target)}% */}
                </span>
              </div>
              {/* <p>Hạn mức: {money.formatVietnameseCurrency(saving.target)}</p> */}
            </Card>
          ))}
          {filteredSavings.length === 0 && (
            <div className="w-full">
              <NoData />
            </div>
          )}
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 float-right  rounded"
        onClick={() => setModalOpen(true)}
      >
        Thêm khoản tiết kiệm
      </button>
      <button
        onClick={() => setEditSavingLimitModal(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 float-right mr-4 rounded"
      >
        Cài hạn mức
      </button>

      <AddSaveModal isOpen={modalOpen} setModalOpen={setModalOpen} />

      <SaveDetailModal
        month={selectedMonth}
        year={selectedYear}
        saving={thisMonthSavingMoney}
        open={detailModalOpen}
        setOpen={setDetailModalOpen}
      />

      <EditSavingLimitModal
        open={editSavingLimitModal}
        savingMoney={savingMoney}
        setSavingMoney={setSavingMoney}
        setOpen={setEditSavingLimitModal}
      />
    </div>
  );
};

export default SaveManagement;
