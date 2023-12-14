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

  createErrors: { state: false },
  setCreateErrors: (createErrors) => set({ createErrors }),

  createCategory: (category, setOpen) => {
    axiosClient
      .post('categories', category)
      .then(({ data }) => {
        set((state) => ({
          categories: [...state.categories, data.data],
        }));

        toast.success('Thêm danh mục thành công.', {
          autoClose: 1500,
        });

        setOpen(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;

          let errors = {
            name: responseErrors.name || [],
            limit: responseErrors.limit || [],
            state: true,
          };

          set({ createErrors: errors });
        }

        console.log(error);

        toast.error('Thêm danh mục thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {});
  },
}));

export default useCategoryStore;
