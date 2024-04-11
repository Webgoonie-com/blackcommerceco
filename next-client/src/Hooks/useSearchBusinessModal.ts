import { create } from "zustand";

interface SearchBusinessModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useSearchBusinessModal = create<SearchBusinessModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))

export default useSearchBusinessModal;