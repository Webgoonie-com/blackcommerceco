import { create } from "zustand";

interface SearchPropertyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSearchPropertyModal = create<SearchPropertyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))

export default useSearchPropertyModal;