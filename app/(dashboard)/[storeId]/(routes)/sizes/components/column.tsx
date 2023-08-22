'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type SizeColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Nama',
	},
	{
		accessorKey: 'value',
		header: 'Value',
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
