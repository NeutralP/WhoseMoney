import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
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
  const [searchInput, setSearchInput] = useState('');
  const [categories, fetchingCategories, fetchCategories] = useCategoryStore(
    (state) => [
      state.categories,
      state.fetchingCategories,
      state.fetchCategories,
    ]
  );
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setSearchInput('');
    setFilteredCategories(categories);
  }, [categories]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = () => {
    const results = categories.filter((item) =>
      item.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredCategories(results);
  };

  if (fetchingCategories) return <Fallback />;

  return (
    <div className="mt-8 flex flex-col overflow-hidden container mx-auto p-4 bg-white shadow rounded-lg">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-700">Quản lý danh mục</h2>
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
      <div className="flex container items-center justify-between mb-9 mt-5">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 float-right rounded"
        >
          Thêm danh mục
        </button>
        <div>
          <form>
            <Input
              className="border border-solid mr-2 focus:border focus:border-solid border-gray-300 rounded w-full p-1"
              type="text"
              placeholder="Tìm kiếm danh mục..."
              value={searchInput}
              onChange={handleSearchInput}
              style={{ width: 300 }}
            />
            <Button onClick={handleSearchSubmit} className="text-blue-500">
              <SearchOutlined className="align-baseline	" />
            </Button>
          </form>
        </div>
      </div>
      <div className="flex-1 min-h-0 grid grid-cols-4 flex-wrap gap-x-10 gap-y-12 overflow-y-auto px-6 pb-6 pt-1">
        {filteredCategories.length > 0 &&
          filteredCategories.map((category) => (
            <CategoryCard
              setSelectedCategory={setSelectedCategory}
              setDetailModalOpen={setDetailModalOpen}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              key={category.id}
              category={category}
            />
          ))}
      </div>
      {filteredCategories.length === 0 && (
        <div className="w-full">
          <NoData />
        </div>
      )}

      <CategoryManagementModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />

      <ViewCategoryDetailModal
        category={selectedCategory}
        open={detailModalOpen}
        setOpen={setDetailModalOpen}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default CategoryManagement;
