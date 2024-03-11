import { create } from "zustand";

interface RentMyPropertyModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRentMyPropertyModal = create<RentMyPropertyModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))

export default useRentMyPropertyModal;