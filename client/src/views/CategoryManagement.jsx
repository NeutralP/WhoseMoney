import React, { useState } from 'react';
import CategoryCard from '~/features/CategoryCard/CategoryCard';
import CategoryManagementModal from '~/features/CategoryManagementModal/CategoryManagementModal';

const CategoryManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Danh mục 1',
      amount: 100000,
    },
    // Make 10 more categories
    {
      id: 2,
      name: 'Danh mục 2',
      amount: 20000,
    },
    {
      id: 3,
      name: 'Danh mục 3',
      amount: 5000000,
    },
    {
      id: 4,
      name: 'Danh mục 4',
      amount: 5000000,
    },
    {
      id: 5,
      name: 'Danh mục 5',
      amount: 5000000,
    },
    {
      id: 6,
      name: 'Danh mục 6',
      amount: 5000000,
    },
    {
      id: 7,
      name: 'Danh mục 7',
      amount: 5000000,
    },
    {
      id: 8,
      name: 'Danh mục 8',
      amount: 5000000,
    },
    {
      id: 9,
      name: 'Danh mục 9',
      amount: 5000000,
    },
    {
      id: 10,
      name: 'Danh mục 10',
      amount: 5000000,
    },
    {
      id: 11,
      name: 'Danh mục 11',
      amount: 5000000,
    },
    {
      id: 12,
      name: 'Danh mục 12',
      amount: 5000000,
    },
    {
      id: 13,
      name: 'Danh mục 13',
      amount: 5000000,
    },
    {
      id: 14,
      name: 'Danh mục 14',
      amount: 5000000,
    },
    {
      id: 15,
      name: 'Danh mục 15',
      amount: 5000000,
    },
    {
      id: 16,
      name: 'Danh mục 16',
      amount: 5000000,
    },
    {
      id: 17,
      name: 'Danh mục 17',
      amount: 5000000,
    },
    {
      id: 18,
      name: 'Danh mục 18',
      amount: 5000000,
    },
  ]);
  //   const [categories, setCategories] = useState([]);

  return (
    <div className="mt-8 flex flex-col overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-700">Quản lý danh mục</h2>
      <div className="flex container justify-between mb-9 mt-5">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 float-right rounded"
        >
          Thêm danh mục
        </button>
        <div className="flex items-center">
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
      <div className="flex-1 min-h-0 w-full flex flex-wrap gap-x-10 gap-y-12 overflow-y-auto px-6 pb-6 pt-1">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      <CategoryManagementModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default CategoryManagement;
