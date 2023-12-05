import { toast } from 'react-toastify';
import { create } from 'zustand';
import axiosClient from '~/axios';

const useCategoryStore = create((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  fetchingCategories: true,
  setFetchingCategories: (fetchingCategories) => set({ fetchingCategories }),

  fetchCategories: () => {
    set({ fetchingCategories: true });
    axiosClient
      .get('categories')
      .then(({ data }) => {
        set({ categories: data.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ fetchingCategories: false });
      });
  },

  createCategory: (category) => {
    axiosClient
      .post('categories', category)
      .then(({ data }) => {
        set((state) => ({
          categories: [...state.categories, data.data],
        }));

        toast.success('Thêm danh mục thành công.', {
          autoClose: 1500,
        });
      })
      .catch((error) => {
        console.log(error);

        toast.error('Thêm danh mục thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {});
  },
}));

export default useCategoryStore;
