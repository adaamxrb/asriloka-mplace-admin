import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function GET(
	req: Request,
	{ params }: { params: { variantId: string } }
) {
	try {
		if (!params.variantId) {
			return new NextResponse('Variant Id is Required', { status: 400 });
		}

		const variant = await prismadb.variant.findUnique({
			where: {
				id: params.variantId,
			},
		});

		return NextResponse.json(variant);
	} catch (error) {
		console.log('[VARIANTS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; variantId: string } }
) {
	try {
		const { userId } = auth();
		const body = await req.json();

		const { name, value } = body;
		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		if (!name) {
			return new NextResponse('name is Required', { status: 400 });
		}
		if (!value) {
			return new NextResponse('value is Required', { status: 400 });
		}

		if (!params.variantId) {
			return new NextResponse('variant Id is Required', {
				status: 400,
			});
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

		const variant = await prismadb.variant.updateMany({
			where: {
				id: params.variantId,
			},
			data: {
				name,
				value,
			},
		});

		return NextResponse.json(variant);
	} catch (error) {
		console.log('[VARIANT_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; variantId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		if (!params.variantId) {
			return new NextResponse('variant Id is Required', {
				status: 400,
			});
		}

		const variant = await prismadb.variant.deleteMany({
			where: {
				id: params.variantId,
			},
		});

		return NextResponse.json(variant);
	} catch (error) {
		console.log('[VARIANT_DELETE ]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
