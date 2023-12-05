import { create } from 'zustand';
import axiosClient from '~/axios';

const useEarningStore = create((set) => ({
  targets: [],
  setTargets: (targets) => set({ targets }),

  fetchingTargets: false,
  setFetchingTargets: (fetchingTargets) => set({ fetchingTargets }),

  fetchTargets: () => {
    set({ fetchingTargets: true });
    axiosClient
      .get('earning-target')
      .then(({ data }) => {
        set({ targets: data.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ fetchingTargets: false });
      });
  },
}));

export default useEarningStore;
