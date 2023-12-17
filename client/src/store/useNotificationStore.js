import { create } from 'zustand';
import axiosClient from '~/axios';

const useNotificationStore = create((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),

  fetchingNotifications: false,
  setFetchingNotifications: (fetchingNotifications) =>
    set({ fetchingNotifications }),

  fetchNotifications: () => {
    set({ fetchingNotifications: true });
    axiosClient
      .get('/notifications')
      .then(({ data }) => {
        console.log(data.data);
        set({ notifications: data.data });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        set({ fetchingNotifications: false });
      });
  },
}));

export default useNotificationStore;
