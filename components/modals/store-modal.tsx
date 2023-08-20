'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';

export const StoreModal = () => {
	const storeModal = useStoreModal();

	return (
		<Modal
			title="Tambahkan Toko"
			description="Tambahkan Toko baru untuk memulai berjualan"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}>
			Future create store form
		</Modal>
	);
};
