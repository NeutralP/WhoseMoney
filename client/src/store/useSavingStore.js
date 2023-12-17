import { toast } from 'react-toastify';
import { create } from 'zustand';
import axiosClient from '~/axios';

const useSavingStore = create((set, get) => ({
  totalSaving: 0,
  setTotalSaving: (totalSaving) => set({ totalSaving }),

  savingMoney: [],
  setSavingMoney: (savings) => set({ savings }),

  savingTargets: [],
  setSavingTargets: (savingTargets) => set({ savingTargets }),

  fetchingSavingMoney: true,
  setFetchingSavingMoney: (fetchingSavingMoney) => set({ fetchingSavingMoney }),

  fetchSavingMoney: () => {
    set({ fetchingSavingMoney: true });
    axiosClient
      .get('saving-money')
      .then(({ data }) => {
        set({ totalSaving: data.data });
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

  fetchSavingTargetsByMonth: (month, year) => {
    set({ fetchingSavingMoney: true });
    axiosClient
      .get(`saving-targets/${month}/${year}`)
      .then(({ data }) => {
        set({ savingTargets: data.data });
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

  createSavingMoney: (saving, setOpen, month, year) => {
    axiosClient
      .post('saving-money', saving)
      .then(({}) => {
        toast.success('Thêm tiết kiệm thành công.', {
          autoClose: 1500,
        });

        setOpen(false);

        // Re-fetch the saving money
        const { fetchSavingMoneyByMonth, fetchSavingMoney } = get();
        fetchSavingMoney();
        fetchSavingMoneyByMonth(month || saving.month, year || saving.year);
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

        toast.error('Thêm tiết kiệm thất bại.', {
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

        toast.success('Cập nhật tiết kiệm thành công.', {
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

  targetErrors: { state: false },
  setTargetErrors: (targetErrors) => set({ targetErrors }),

  createSavingTarget: (savingTarget, month, year, setOpen) => {
    axiosClient
      .post('saving-targets', savingTarget)
      .then(({}) => {
        toast.success('Thêm hạn mức thành công.', {
          autoClose: 1500,
        });

        // Re-fetch the saving target
        const { fetchSavingTargetsByMonth } = get();
        fetchSavingTargetsByMonth(month, year);

        setOpen(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;

          let errors = {
            target: responseErrors.target || [],
            month: responseErrors.month || [],
            year: responseErrors.year || [],
            state: true,
          };

          set({ targetErrors: errors });
        }

        console.log(error);

        toast.error('Thêm hạn mức thất bại.', {
          autoClose: 1500,
        });
      });
  },

  updateSavingTarget: (savingTargetId, target, month, year, setOpen) => {
    axiosClient
      .patch(`saving-targets/${savingTargetId}`, target)
      .then(({}) => {
        toast.success('Cập nhật hạn mức thành công.', {
          autoClose: 1500,
        });

        // Re-fetch the saving target
        const { fetchSavingTargetsByMonth } = get();
        fetchSavingTargetsByMonth(month, year);

        setOpen(false);
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          const responseErrors = error.response.data.errors;

          let errors = {
            target: responseErrors.target || [],
            month: responseErrors.month || [],
            year: responseErrors.year || [],
            state: true,
          };

          set({ targetErrors: errors });
        }

        console.log(error);

        toast.error('Cập nhật hạn mức thất bại.', {
          autoClose: 1500,
        });
      });
  },
}));

export default useSavingStore;
