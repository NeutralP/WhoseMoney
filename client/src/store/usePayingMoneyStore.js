import { toast } from 'react-toastify';
import { create } from 'zustand';
import axiosClient from '~/axios';

const usePayingMoneyStore = create((set) => ({
  payingMoney: [],
  setPayingMoney: (payingMoney) => set({ payingMoney }),

  fetchingPayingMoney: true,
  setFetchingPayingMoney: (fetchingPayingMoney) => set({ fetchingPayingMoney }),

  fetchPayingMoney: () => {
    set({ fetchingPayingMoney: true });
    axiosClient
      .get('paying-money')
      .then(({ data }) => {
        set({ payingMoney: data.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ fetchingPayingMoney: false });
      });
  },

  payingMoneyActionLoading: false,
  setPayingMoneyActionLoading: (payingMoneyActionLoading) =>
    set({ payingMoneyActionLoading }),

  createErrors: { state: false },
  setCreateErrors: (createErrors) => set({ createErrors }),

  createNewPayingMoney: (payingMoney, setOpen) => {
    set({ payingMoneyActionLoading: true });
    axiosClient
      .post('paying-money', payingMoney)
      .then(({ data }) => {
        set((state) => ({ payingMoney: [data.data, ...state.payingMoney] }));
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;

          let errors = {
            name: responseErrors.name || [],
            amount: responseErrors.amount || [],
            category: responseErrors.category_id || [],
            date: responseErrors.date || [],
            state: true,
          };

          set({ createErrors: errors });
        }

        console.log(error);
        toast.error('Thêm khoản chi thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {
        set({ payingMoneyActionLoading: false });
        setOpen(false);
        toast.success('Thêm khoản chi thành công.', {
          autoClose: 1500,
        });
      });
  },

  updateErrors: { state: false },
  setUpdateErrors: (updateErrors) => set({ updateErrors }),

  udpatePayingMoney: (id, payingMoney, setOpen) => {
    set({ payingMoneyActionLoading: true });
    axiosClient
      .patch(`paying-money/${id}`, payingMoney)
      .then(({ data }) => {
        set((state) => ({
          payingMoney: state.payingMoney.map((item) =>
            item.id === id ? data.data : item
          ),
        }));
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;

          let errors = {
            name: responseErrors.name || [],
            amount: responseErrors.amount || [],
            date: responseErrors.date || [],
            state: true,
          };

          set({ updateErrors: errors });
        }

        console.log(error);
        toast.error('Cập nhật khoản chi thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {
        set({ payingMoneyActionLoading: false });
        setOpen(false);
        toast.success('Cập nhật khoản chi thành công.', {
          autoClose: 1500,
        });
      });
  },

  deletePayingMoney: (id) => {
    set({ payingMoneyActionLoading: true });
    axiosClient
      .delete(`paying-money/${id}`)
      .then(() => {
        set((state) => ({
          payingMoney: state.payingMoney.filter((item) => item.id !== id),
        }));

        // toast.success('Xóa khoản chi thành công.', {
        //   autoClose: 1500,
        // });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Xóa khoản chi thất bại.', {
          autoClose: 1500,
        });
      })
      .finally(() => {
        set({ payingMoneyActionLoading: false });
      });
  },
}));

export default usePayingMoneyStore;
