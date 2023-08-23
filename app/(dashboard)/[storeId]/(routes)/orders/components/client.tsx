'use client';

import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

import { OrderColumn, columns } from './column';

interface OrderClientProps {
	data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
	return (
		<>
			<Heading
				title={`Pesanan (${data.length})`}
				description="Kelola Pesanan Toko Anda"
			/>
			<Separator />
			<DataTable searchKey="products" columns={columns} data={data} />
		</>
	);
};
