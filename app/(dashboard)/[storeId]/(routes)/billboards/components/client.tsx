'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { BillboardColumn, columns } from './column';
import ApiList from '@/components/ui/api-list';

interface BillboardClientProps {
	data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Papan Iklan (${data.length})`}
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
			<Separator />
			<DataTable searchKey="label" columns={columns} data={data} />
			<Heading title="API" description="API untuk memanggil Billboards" />
			<Separator />
			<ApiList entityName="billboards" entityIdName="billboardId" />
		</>
	);
};
