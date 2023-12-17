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
  const [selectedSave, setSelectedSave] = useState({}); // { month, year, amount, target

  const [totalSaving, fetchingSavingMoney, fetchSavingMoney] = useSavingStore(
    (state) => [
      state.totalSaving,
      state.fetchingSavingMoney,
      state.fetchSavingMoney,
    ]
  );

  const [savingMoney, fetchSavingMoneyByMonth] = useSavingStore((state) => [
    state.savingMoney,
    state.fetchSavingMoneyByMonth,
  ]);

  const [savingTargets, fetchSavingTargetsByMonth] = useSavingStore((state) => [
    state.savingTargets,
    state.fetchSavingTargetsByMonth,
  ]);

  useEffect(() => {
    fetchSavingMoney();
  }, []);

  useEffect(() => {
    fetchSavingMoneyByMonth(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    fetchSavingTargetsByMonth(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    // Get current month data
    const currentMonthSaving = savingMoney.filter((savingMoney) => {
      return (
        selectedMonth === savingMoney.month && selectedYear === savingMoney.year
      );
    });
    const currentMonthTotalSaving = currentMonthSaving.reduce((acc, saving) => {
      return acc + saving.amount;
    }, 0);
    const currentMonthTargetItem = savingTargets.find(
      (savingTarget) =>
        savingTarget.month === selectedMonth &&
        savingTarget.year === selectedYear
    );
    const currentMonthTarget = currentMonthTargetItem
      ? currentMonthTargetItem.target
      : 0;
    const currentMonthCompletion =
      currentMonthTarget > 0
        ? Math.min(
            Math.round((currentMonthTotalSaving * 100) / currentMonthTarget),
            100
          )
        : 0;

    const currentMonth = {
      total_save: currentMonthTotalSaving,
      month: selectedMonth,
      year: selectedYear,
      target: currentMonthTarget,
      completion: currentMonthCompletion,
      savings: currentMonthSaving,
    };

    // Get previous month data
    let month = (selectedMonth - 1 + 12) % 12 || 12;
    let year = selectedMonth - 1 === 0 ? selectedYear - 1 : selectedYear;

    const prevMonthSaving = savingMoney.filter((savingMoney) => {
      return month === savingMoney.month && year === savingMoney.year;
    });
    const prevMonthTotalSaving = prevMonthSaving.reduce((acc, saving) => {
      return acc + saving.amount;
    }, 0);
    const prevMonthTargetItem = savingTargets.find(
      (savingTarget) =>
        savingTarget.month === year && savingTarget.year === year
    );
    const prevMonthTarget = prevMonthTargetItem
      ? prevMonthTargetItem.target
      : 0;
    const prevMonthCompletion =
      prevMonthTarget > 0
        ? Math.min(
            Math.round((prevMonthTotalSaving * 100) / prevMonthTarget),
            100
          )
        : 0;

    const prevMonth = {
      total_save: prevMonthTotalSaving,
      month: month,
      year: year,
      target: prevMonthTarget,
      completion: prevMonthCompletion,
      savings: prevMonthSaving,
    };

    // Get prev x2 month data
    month =
      selectedMonth - 2 <= 0
        ? (selectedMonth - 2 + 12) % 12 || 12
        : selectedMonth - 2;
    year = selectedMonth - 2 <= 0 ? selectedYear - 1 : selectedYear;

    const pprevMonthSaving = savingMoney.filter((savingMoney) => {
      return month === savingMoney.month && year === savingMoney.year;
    });
    const pprevMonthTotalSaving = pprevMonthSaving.reduce((acc, saving) => {
      return acc + saving.amount;
    }, 0);
    const pprevMonthTargetItem = savingTargets.find(
      (savingTarget) =>
        savingTarget.month === year && savingTarget.year === year
    );
    const pprevMonthTarget = pprevMonthTargetItem
      ? pprevMonthTargetItem.target
      : 0;
    const pprevMonthCompletion =
      pprevMonthTarget > 0
        ? Math.min(
            Math.round((pprevMonthTotalSaving * 100) / pprevMonthTarget),
            100
          )
        : 0;

    const pprevMonth = {
      total_save: pprevMonthTotalSaving,
      month: month,
      year: year,
      target: pprevMonthTarget,
      completion: pprevMonthCompletion,
      savings: pprevMonthSaving,
    };

    const newFilteredSavings = [currentMonth, prevMonth, pprevMonth];
    setFilteredSavings(newFilteredSavings);
  }, [savingMoney, savingTargets, selectedMonth, selectedYear]);

  const percentage = useMemo(() => {
    if (filteredSavings.length === 0) return 0;

    if (filteredSavings[0].target === 0) return 0;
    const value = Math.min(
      Math.round(
        (filteredSavings[0].total_save / filteredSavings[0].target) * 100
      ),
      100
    );
    return value;
  }, [filteredSavings]);
  const testData = [{ bgcolor: '#1677ff', completed: percentage }];

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
          Tổng tiền tiết kiệm: {money.formatVietnameseCurrency(totalSaving)}
        </p>
        <p className="">
          Số ngày còn lại trong tháng: {getDateLeftInCurrentMonth()}
        </p>
      </div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="">
            Tiết kiệm tháng này:{' '}
            {money.formatVietnameseCurrency(
              filteredSavings[0]?.total_save ?? 0
            )}
          </p>
        </div>
        <div>
          <p className="">
            Hạn mức tháng này:{' '}
            {money.formatVietnameseCurrency(filteredSavings[0]?.target ?? 0)}
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
          {filteredSavings.map((saving, index) => (
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
                saving.month === selectedMonth && saving.year === selectedYear
                  ? `Còn lại ${getDateLeftInCurrentMonth()} ngày`
                  : 'Hoàn thành'
              }
              onClick={() => {
                setSelectedSave(saving);
                setDetailModalOpen(true);
              }}
              key={index}
            >
              <div className="flex justify-between mb-2 mt-2">
                <p>
                  Tổng tiền tiết kiệm:{' '}
                  {money.formatVietnameseCurrency(saving.total_save)}
                </p>
                <span>{saving.completion}%</span>
              </div>
              <p>Hạn mức: {money.formatVietnameseCurrency(saving.target)}</p>
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

      <AddSaveModal
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      <SaveDetailModal
        saving={selectedSave}
        open={detailModalOpen}
        setOpen={setDetailModalOpen}
      />

      <EditSavingLimitModal
        open={editSavingLimitModal}
        setOpen={setEditSavingLimitModal}
        targetId={
          savingTargets.find(
            (s) => s.month === selectedMonth && s.year === selectedYear
          )?.id
        }
        selectedMonthTarget={filteredSavings[0]?.target}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default SaveManagement;
