import React, { useState, useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './ReceiptManagementModal.scss';
import { Input } from 'antd';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import dayjs from 'dayjs';
import useCategoryStore from '~/store/useCategoryStore';
import { shouldShowError } from '~/utils';

const numberOfDaysInCurrentMonth = dayjs().daysInMonth();

const CategoryManagementModal = ({ isOpen, setOpen }) => {
  const modalRef = useRef();

  const [createErrors, createCategory] = useCategoryStore((state) => [
    state.createErrors,
    state.createCategory,
  ]);

  const [categoryData, setCategoryData] = useState({
    name: '',
    limit: '0',
  });
  // True - Days | False - Month
  const [mode, setMode] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, setOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleCategoryLimitChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: Number(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(
      {
        name: categoryData.name,
        limit: mode
          ? categoryData.limit * numberOfDaysInCurrentMonth
          : categoryData.limit,
      },
      setOpen
    );
  };

  if (!isOpen) return null;

  return (
    <div className="custom-modal fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg w-[480px] shadow-lg"
      >
        <form className="bg-white" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="float-right font-bold"
          >
            X
          </button>
          <div className="clear-both text-lg font-bold mb-4">Thêm danh mục</div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Tên danh mục</label>
            <Input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={categoryData.name}
              placeholder="Tên danh mục"
              status={
                shouldShowError(
                  createErrors,
                  'name',
                  categoryData.name.length === 0
                ) && 'error'
              }
            />
            {createErrors.state &&
              createErrors.name.length > 0 &&
              categoryData.name.length === 0 &&
              createErrors.name.map((error, index) => (
                <p className="text-sm text-red-600 mt-2" key={index}>
                  {error}
                </p>
              ))}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Mức chi / Ngày</label>
            <Input
              onChange={handleCategoryLimitChange}
              type="text"
              name="limit"
              placeholder="Nhập số tiền"
              value={
                !mode
                  ? Math.round(categoryData.limit / numberOfDaysInCurrentMonth)
                  : categoryData.limit
              }
              disabled={!mode}
              status={
                shouldShowError(
                  createErrors,
                  'limit',
                  categoryData.limit === 0
                ) && 'error'
              }
            />
          </div>

          <div className="cursor-pointer flex items-center justify-center">
            <HiOutlineSwitchVertical
              onClick={() => setMode(!mode)}
              className="text-xl"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Mức chi / Tháng</label>
            <Input
              onChange={handleCategoryLimitChange}
              type="text"
              name="limit"
              placeholder="Nhập số tiền"
              value={mode ? categoryData.limit * 30 : categoryData.limit}
              disabled={mode}
              status={
                shouldShowError(
                  createErrors,
                  'limit',
                  categoryData.limit === 0
                ) && 'error'
              }
            />
          </div>
          {createErrors.state &&
            createErrors.limit.length > 0 &&
            categoryData.limit.length === 0 &&
            createErrors.limit.map((error, index) => (
              <p className="text-sm text-red-600 mt-2" key={index}>
                {error}
              </p>
            ))}

          <button
            id="submit"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 w-full rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryManagementModal;
