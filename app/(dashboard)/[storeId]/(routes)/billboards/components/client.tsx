'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

export const BillboardClient = () => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Papan Iklan (0)"
					description="Kelola Papan Iklan Toko Anda"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/billboards/new`)
					}>
					<Plus className="h-4 w-4" />
					Tambah Papan Iklan Baru
				</Button>
			</div>
		</>
	);
};
