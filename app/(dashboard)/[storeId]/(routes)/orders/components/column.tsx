'use client';

import { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	products: string;
	createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'products',
		header: 'Produk',
	},
	{
		accessorKey: 'phone',
		header: 'Telepon',
	},
	{
		accessorKey: 'address',
		header: 'Alamat',
	},
	{
		accessorKey: 'totalPrice',
		header: 'Total Harga',
	},
	{
		accessorKey: 'isPaid',
		header: 'Status Pembayaran',
	},
	{
		accessorKey: 'createdAt',
		header: 'Terakhir diubah',
	},
];
