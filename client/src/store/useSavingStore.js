import { toast } from 'react-toastify';
import { create } from 'zustand';
import axiosClient from '~/axios';

const useSavingStore = create((set) => ({
  savingMoney: [],
  setSavingMoney: (savings) => set({ savings }),

  fetchingSavingMoney: true,
  setFetchingSavingMoney: (fetchingSavingMoney) => set({ fetchingSavingMoney }),

  fetchSavingMoney: () => {
    set({ fetchingSavingMoney: true });
    axiosClient
      .get('saving-money')
      .then(({ data }) => {
        set({ savingMoney: data.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ fetchingSavingMoney: false });
      });
  },

  fetchSavingMoneyByMonth: (month, year) => {
    set({ fetchingSavingMoney: true });
    axiosClient
      .get(`saving-money/${month}/${year}`)
      .then(({ data }) => {
        set({ savingMoney: data.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ fetchingSavingMoney: false });
      });
  },

  createSavingMoneyErrors: { state: false },
  setCreateSavingMoneyErrors: (createSavingMoneyErrors) =>
    set({ createSavingMoneyErrors }),

  createSavingMoney: (saving, setOpen) => {
    axiosClient
      .post('saving-money', saving)
      .then(({ data }) => {
        set((state) => ({
          savingMoney: [data.data, ...state.savingMoney],
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
            amount: responseErrors.amount || [],
            date: responseErrors.date || [],
            description: responseErrors.description || [],
            state: true,
          };

          set({ createSavingMoneyErrors: errors });
        }

        console.log(error);

        toast.error('Thêm danh mục thất bại.', {
          autoClose: 1500,
        });
      });
  },

  updateErrors: { state: false },
  setUpdateErrors: (updateErrors) => set({ updateErrors }),

  updateSaving: (saving, setOpen) => {
    axiosClient
      .put(`savings/${saving.id}`, saving)
      .then(({ data }) => {
        set((state) => ({
          savings: state.savings.map((item) =>
            item.id === data.data.id ? data.data : item
          ),
        }));

        toast.success('Cập nhật danh mục thành công.', {
          autoClose: 1500,
        });

        setOpen(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;
        }
      });
  },
}));

export default useSavingStore;
