import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { useParams } from 'next/navigation';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const {
			name,
			price,
			categoryId,
			variantId,
			sizeId,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}
		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}
		if (!images || !images.length) {
			return new NextResponse('Images is required', { status: 400 });
		}
		if (!price) {
			return new NextResponse('price is required', { status: 400 });
		}
		if (!categoryId) {
			return new NextResponse('category id is required', { status: 400 });
		}
		if (!sizeId) {
			return new NextResponse('size id is required', { status: 400 });
		}
		if (!variantId) {
			return new NextResponse('variant id is required', { status: 400 });
		}
		if (!params.storeId) {
			return new NextResponse('storeId is required', { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const product = await prismadb.product.create({
			data: {
				name,
				price,
				isFeatured,
				isArchived,
				categoryId,
				variantId,
				sizeId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [
							...images.map((image: { url: string }) => image),
						],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCT_POST]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } }
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get('categoryId') || undefined;
		const variantId = searchParams.get('variantId') || undefined;
		const sizeId = searchParams.get('sizeId') || undefined;
		const isFeatured = searchParams.get('isFeatured');

		if (!params.storeId) {
			return new NextResponse('store Id is required', { status: 400 });
		}
		const products = await prismadb.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				variantId,
				sizeId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				variant: true,
				size: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log('[PRODUCTS_GET]', error);
		return new NextResponse('Internal server error', { status: 500 });
	}
}
