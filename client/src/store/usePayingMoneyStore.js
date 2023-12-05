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

  createNewPayingMoney: (payingMoney, setOpen) => {
    set({ payingMoneyActionLoading: true });
    axiosClient
      .post('paying-money', payingMoney)
      .then(({ data }) => {
        set((state) => ({ payingMoney: [data.data, ...state.payingMoney] }));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ payingMoneyActionLoading: false });
        setOpen(false);
        toast.success('Thêm khoản chi thành công.', {
          autoClose: 1500,
        });
      });
  },

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
        console.log(error);
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
