'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { SizeColumn, columns } from './column';
import ApiList from '@/components/ui/api-list';

interface SizesClientProps {
	data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Ukuran (${data.length})`}
					description="Kelola Ukuran di Toko Anda"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
					<Plus className="h-4 w-4" />
					Tambah Papan Iklan Baru
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API untuk memanggil Ukuran" />
			<Separator />
			<ApiList entityName="sizes" entityIdName="sizeId" />
		</>
	);
};
