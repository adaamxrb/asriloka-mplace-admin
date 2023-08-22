'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
	id: string;
	name: string;
	price: string;
	size: string;
	category: string;
	variant: string;
	isFeatured: boolean;
	isArchived: boolean;
	createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Nama',
	},
	{
		accessorKey: 'isArchived',
		header: 'Arsip',
	},
	{
		accessorKey: 'isFeatured',
		header: 'Tampilkan',
	},
	{
		accessorKey: 'price',
		header: 'Harga',
	},
	{
		accessorKey: 'category',
		header: 'Kategori',
	},
	{
		accessorKey: 'size',
		header: 'Ukuran',
	},
	{
		accessorKey: 'variant',
		header: 'Jenis',
	},
	{
		accessorKey: 'createdAt',
		header: 'Terakhir diubah',
	},
	{
		header: 'Aksi',
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
