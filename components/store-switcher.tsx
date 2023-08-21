'use client';

import { Store } from '@prisma/client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Check, Store as StoreIcon } from 'lucide-react';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from './ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
	typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: Store[];
}

export default function StoreSwitcher({
	className,
	items = [],
}: StoreSwitcherProps) {
	const storeModal = useStoreModal();
	const params = useParams();
	const router = useRouter();

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const [open, setOpen] = useState(false);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label="Pilih Toko"
					className={cn(
						'w-[200px] justify-between font-bold',
						className
					)}>
					<StoreIcon className="mr-2 h-4 w-4" />
					{currentStore?.label}
					<div className="ml-auto h-4 w-4 shrink-0"></div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandList>
						<CommandGroup heading="Toko Anda">
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className="text-sm">
									<StoreIcon className="mr-2 h-4 w-4" />
									{store.label}
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											currentStore?.value === store.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
				</Command>
			</PopoverContent>
		</Popover>
	);
}
