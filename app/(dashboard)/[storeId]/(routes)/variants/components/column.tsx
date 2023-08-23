'use client';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type VariantColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<VariantColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Nama',
	},
	{
		accessorKey: 'value',
		header: 'Varian',
		cell: ({ row }) => (
			<div className="flex items-center gap-x-2">
				{row.original.value}
			</div>
		),
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
