import { create } from 'zustand';

const confirmModalInitialState = {
  open: false,
  title: '',
  content: '',
  handleCancel: () => {},
  handleOk: () => {},
};

const useGlobalModalStore = create((set) => ({
  confirmModal: { ...confirmModalInitialState },
  setConfirmModal: (confirmModal) => set({ confirmModal }),
  resetConfirmModal: () => set({ confirmModal: confirmModalInitialState }),
}));

export default useGlobalModalStore;
