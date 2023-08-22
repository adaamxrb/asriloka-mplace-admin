'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { ProductColumn, columns } from './column';
import ApiList from '@/components/ui/api-list';

interface ProductClientProps {
	data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Produk (${data.length})`}
					description="Kelola Produk Toko Anda"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/products/new`)
					}>
					<Plus className="h-4 w-4" />
					Tambah Produk Baru
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API untuk memanggil Produk" />
			<Separator />
			<ApiList entityName="products" entityIdName="productId" />
		</>
	);
};
