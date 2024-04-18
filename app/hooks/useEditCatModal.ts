import { create } from "zustand";

interface EditCatModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditCatModal = create<EditCatModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditCatModal;
