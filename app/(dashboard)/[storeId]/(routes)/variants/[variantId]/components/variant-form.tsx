'use client';

import * as z from 'zod';
import { Variant } from '@prisma/client';
import { Trash } from 'lucide-react';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(3),
});

type VariantFormValues = z.infer<typeof formSchema>;

interface VariantFormProps {
	initialData: Variant | null;
}

export const VariantForm: React.FC<VariantFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit Varian' : 'Buat Varian';
	const description = initialData ? 'Edit Varian' : 'Tambah Varian Baru';
	const toastMessage = initialData
		? 'Varian Berhasil Di Perbarui'
		: 'Varian Berhasil Di Buat ';
	const action = initialData ? 'Simpan Perubahan' : 'Buat Varian';

	const form = useForm<VariantFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	const onSubmit = async (data: VariantFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/variants/${params.variantId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/variants`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/variants`);
			toast.success(toastMessage);
		} catch (error) {
			toast.error('Terjadi Kesalahan');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(
				`/api/${params.storeId}/variants/${params.variantId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/variants`);
			toast.success('Varian Telah Di Hapus.');
		} catch (error) {
			toast.error(
				'Pastikan Anda telah menghapus semua produk yang menggunakan Varian ini terlebih dahulu.'
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
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						variant="destructive"
						size="sm"
						onClick={() => setOpen(true)}>
						<Trash className="h-4 w-4 " />
						Hapus
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full">
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama Produk</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Durian"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Varian Untuk Produk</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Durian Merah"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						disabled={loading}
						className="ml-auto"
						type="submit">
						{action}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	);
};
