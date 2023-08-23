'use client';
import { useRouter, useParams } from 'next/navigation';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

import { VariantColumn, columns } from './column';

interface VariantClientProps {
	data: VariantColumn[];
}

export const VariantClient: React.FC<VariantClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Varian (${data.length})`}
					description="Kelola Varian di Toko Anda"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/variants/new`)
					}>
					<Plus className="h-4 w-4" />
					Tambah Varian
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API untuk memanggil Varian" />
			<Separator />
			<ApiList entityName="variants" entityIdName="variantId" />
		</>
	);
};
