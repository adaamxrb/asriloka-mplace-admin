'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from '@/components/ui/modal';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
	name: z.string().min(1),
});

export const StoreModal = () => {
	const storeModal = useStoreModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
		//Create store
	};

	return (
		<Modal
			title="Buat Toko"
			description="Buat Toko dan Mulai berjualan"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}>
			<div>
				<div className="space-y-4 py-2 pb-2">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Toko</FormLabel>
										<FormControl>
											<Input
												placeholder="Masukkan Nama Toko"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex item-center justify-end w-full">
								<Button
									variant="outline"
									onClick={storeModal.onClose}>
									Batal
								</Button>
								<Button type="submit">Buat</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
