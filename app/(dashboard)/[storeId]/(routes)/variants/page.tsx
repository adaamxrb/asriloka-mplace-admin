import { format } from 'date-fns';

import prismadb from '@/lib/prismadb';

import { VariantClient } from './components/client';
import { VariantColumn } from './components/column';

const VariantsPage = async ({
	params,
}: {
	params: {
		storeId: string;
	};
}) => {
	const variants = await prismadb.variant.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedVariants: VariantColumn[] = variants.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<VariantClient data={formattedVariants} />
			</div>
		</div>
	);
};

export default VariantsPage;
