'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

import { CategoryColumn, columns } from './column';

interface CategoryClientProps {
	data: CategoryColumn[];
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Kategori (${data.length})`}
					description="Kelola Kategori Toko Anda"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/categories/new`)
					}>
					<Plus className="h-4 w-4" />
					Tambah Kategori Baru
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API untuk memanggil Kategori" />
			<Separator />
			<ApiList entityName="categories" entityIdName="categoryId" />
		</>
	);
};
