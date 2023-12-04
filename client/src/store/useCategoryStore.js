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
}));

export default useCategoryStore;
