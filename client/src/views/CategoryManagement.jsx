import React, { useEffect, useState } from 'react';
import Fallback from '~/components/Fallback';
import CategoryCard from '~/features/CategoryCard/CategoryCard';
import ViewCategoryDetailModal from '~/features/CategoryDetail/ViewCategoryDetailModal';
import CategoryManagementModal from '~/features/CategoryManagementModal/CategoryManagementModal';
import NoData from '~/features/NoData/NoData';
import useCategoryStore from '~/store/useCategoryStore';

const CategoryManagement = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedCategory, setSelectedCategory] = useState({});
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [categories, fetchingCategories, fetchCategories] = useCategoryStore(
    (state) => [
      state.categories,
      state.fetchingCategories,
      state.fetchCategories,
    ]
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  if (fetchingCategories) return <Fallback />;

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
      <div className="flex-1 min-h-0 grid grid-cols-4 flex-wrap gap-x-10 gap-y-12 overflow-y-auto px-6 pb-6 pt-1">
        {categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard
              setDetailModalOpen={setDetailModalOpen}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              key={category.id}
              category={category}
            />
          ))
        ) : (
          <NoData />
        )}
      </div>

      <CategoryManagementModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <ViewCategoryDetailModal
        open={detailModalOpen}
        setOpen={setDetailModalOpen}
      />
    </div>
  );
};

export default CategoryManagement;
