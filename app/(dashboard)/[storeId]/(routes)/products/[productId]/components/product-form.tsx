'use client';

import * as z from 'zod';
import { Image, Product, Category, Size, Variant } from '@prisma/client';
import { Trash } from 'lucide-react';
import { set, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from '@/components/ui/select';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';

const formSchema = z.object({
	name: z.string().min(1),
	images: z.object({ url: z.string() }).array(),
	price: z.coerce.number().min(1),
	categoryId: z.string().min(1),
	variantId: z.string().min(1),
	sizeId: z.string().min(1),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
	initialData:
		| (Product & {
				images: Image[];
		  })
		| null;
	categories: Category[];
	variant: Variant[];
	sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
	sizes,
	variant,
}) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit Produk' : 'Buat Produk';
	const description = initialData ? 'Edit Produk' : 'Tambah Produk Baru';
	const toastMessage = initialData
		? 'Produk Berhasil Di Perbarui'
		: 'Produk Berhasil Di Buat ';
	const action = initialData ? 'Simpan Perubahan' : 'Buat Produk';

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
			? {
					...initialData,
					price: parseFloat(String(initialData?.price)),
			  }
			: {
					name: '',
					images: [],
					price: 0,
					categoryId: '',
					sizeId: '',
					isFeatured: false,
					isArchived: false,
			  },
	});

	const onSubmit = async (data: ProductFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/products/${params.productId}`,
					data
				);
			} else {
				await axios.post(`/api/${params.storeId}/products`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/products`);
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
				`/api/${params.storeId}/products/${params.productId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success('Produk Telah Di Hapus.');
		} catch (error) {
			toast.error('Terjadi Kesalahan');
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
					<FormField
						control={form.control}
						name="images"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Gambar</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map(
											(image) => image.url
										)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([
												...field.value,
												{ url },
											])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter(
													(current) =>
														current.url !== url
												),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nama</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Nama Produk"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Harga</FormLabel>
									<FormControl>
										<Input
											type="number"
											disabled={loading}
											placeholder="cth: 10000"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="categoryId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Kategori</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Pilih Kategori"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem
													key={category.id}
													value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="sizeId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ukuran</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Pilih Ukuran"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sizes.map((size) => (
												<SelectItem
													key={size.id}
													value={size.id}>
													{size.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="variantId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Jenis</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Pilih Varian"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{variant.map((variant) => (
												<SelectItem
													key={variant.id}
													value={variant.id}>
													{variant.value}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isFeatured"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											// @ts-ignore
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Produk Unggulan</FormLabel>
										<FormDescription>
											Produk ini akan ditampilkan di
											halaman utama toko Anda.
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="isArchived"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4">
									<FormControl>
										<Checkbox
											checked={field.value}
											// @ts-ignore
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>Arsipkan</FormLabel>
										<FormDescription>
											Produk ini tidak akan ditampilkan di
											toko Anda.
										</FormDescription>
									</div>
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
