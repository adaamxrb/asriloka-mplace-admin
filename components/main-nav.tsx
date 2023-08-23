'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export function MainNav({
	className,
	...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/${params.storeId}`,
			label: 'Beranda',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: 'Papan Iklan',
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			href: `/${params.storeId}/categories`,
			label: 'Kategori',
			active: pathname === `/${params.storeId}/categories`,
		},
		{
			href: `/${params.storeId}/sizes`,
			label: 'Ukuran',
			active: pathname === `/${params.storeId}/sizes`,
		},
		{
			href: `/${params.storeId}/variants`,
			label: 'Varian',
			active: pathname === `/${params.storeId}/variants`,
		},
		{
			href: `/${params.storeId}/products`,
			label: 'Produk',
			active: pathname === `/${params.storeId}/products`,
		},
		{
			href: `/${params.storeId}/orders`,
			label: 'Pesanan',
			active: pathname === `/${params.storeId}/orders`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Pengaturan',
			active: pathname === `/${params.storeId}/settings`,
		},
	];

	return (
		<nav
			className={cn(
				'flex items-center space-x-4 lg:space-x-6',
				className
			)}>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active
							? 'text-black dark:text-white'
							: 'text-muted-foreground'
					)}>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
