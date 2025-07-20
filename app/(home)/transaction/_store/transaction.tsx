import { create } from "zustand";

type TransactionStore = {
  isModalOpened: boolean;
  showModal: () => void;
  closeModal: () => void;
  requestedProductId: number | undefined;
  setRequestedProductId: (id: number) => void;
  offeredProductId: number | undefined;
  setOfferedProductId: (id: number) => void;
};

const useTransactionStore = create<TransactionStore>((set) => ({
  isModalOpened: false,
  showModal: () => set({ isModalOpened: true }),
  closeModal: () => set({ isModalOpened: false }),
  requestedProductId: undefined,
  setRequestedProductId: (id: number) => set({ requestedProductId: id }),
  offeredProductId: undefined,
  setOfferedProductId: (id: number) => set({ offeredProductId: id }),
}));

export default useTransactionStore;
