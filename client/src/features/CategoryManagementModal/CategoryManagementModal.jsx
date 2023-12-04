import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ReceiptManagementModal.scss';
import { formatDate } from '~/utils/time';
import axiosClient from '~/axios';

const CategoryManagementModal = ({ isOpen, onClose, onSave }) => {
  const modalRef = useRef();
  const [categoryData, setCategoryData] = useState({
    name: '',
    amount: '',
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleCategoryLimitChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: Number(value) });
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // categoryData.date = formatDate(startDate);
    // onSave(categoryData);
    // console.log(categoryData);
    // onClose();

    // axiosClient.post('/earning-money', categoryData).catch((err) => {
    //   console.error(err);
    // });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        ref={modalRef}
        className="bg-white p-5 rounded-lg w-[480px] shadow-lg"
      >
        <form className="bg-white" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onClose}
            className="float-right font-bold"
          >
            X
          </button>
          <div className="clear-both text-lg font-bold mb-4">
            Thêm danh mục
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Tên danh mục</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              value={categoryData.name}
              placeholder="Tên danh mục"
              className="border border-solid focus:border focus:border-solid border-gray-300 rounded w-full p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Hạn mức chi tiêu</label>
            <input
              onChange={handleCategoryLimitChange}
              type="text"
              name="amount"
              placeholder="Hạn mức chi tiêu"
              value={categoryData.amount}
              className="border border-solid focus:border focus:border-solid border-gray-300 rounded w-full p-2"
            />
          </div>

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
