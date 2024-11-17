import { create } from 'zustand';
import { UseStoreModalProps } from '@/types';

export const useStoreModal = create<UseStoreModalProps>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
