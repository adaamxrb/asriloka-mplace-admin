'use client';

import axios from 'axios';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Copy, Edit, Edit2, Trash } from 'lucide-react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CategoryColumn } from './column';
import { Button } from '@/components/ui/button';
import { AlertModal } from '@/components/modals/alert-modal';

interface CellActionProps {
	data: CategoryColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success('Kategori Id Berhasil Di Salin');
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
			router.refresh();
			toast.success('Kategori Telah Di Hapus.');
		} catch (error) {
			toast.error(
				'Pastikan Anda telah menghapus semua produk yang menggunakan Kategori ini terlebih dahulu.'
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="h-8 w-8 p-0">
						<span className="sr-only">Buka Menu</span>
						<Edit2 className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Pilih Aksi</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" />
						Salin Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(
								`/${params.storeId}/categories/${data.id}`
							)
						}>
						<Edit className="mr-2 h-4 w-4" />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className="mr-2 h-4 w-4" />
						Hapus
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
