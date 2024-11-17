export interface LayoutProps {
	children: React.ReactNode;
}

export interface ModalProps {
	title: string;
	description: string;
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export interface UseStoreModalProps {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

export interface DashboardLayoutProps extends LayoutProps {
	params: { storeId: string };
}
