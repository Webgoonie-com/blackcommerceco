import { create } from "zustand";

interface BusinessRegistrationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useBusinessRegistrationModal = create<BusinessRegistrationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))

export default useBusinessRegistrationModal;