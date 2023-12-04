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
      .put(`paying-money/${id}`, payingMoney)
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
}));

export default usePayingMoneyStore;
