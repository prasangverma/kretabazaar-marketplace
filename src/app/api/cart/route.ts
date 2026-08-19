import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const AddToCartSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().min(1).default(1),
  sessionToken: z.string().optional(),
  userId: z.string().optional()
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionToken = searchParams.get('sessionToken');
    const userId = searchParams.get('userId');

    if (!sessionToken && !userId) {
      return NextResponse.json({ success: true, cart: null, items: [] });
    }

    const cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionToken },
      include: {
        items: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      cart
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = AddToCartSchema.parse(body);

    const sessionToken = validated.sessionToken || 'guest-' + Math.random().toString(36).substring(2, 9);

    let cart = await prisma.cart.findFirst({
      where: validated.userId ? { userId: validated.userId } : { sessionToken }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          sessionToken: validated.userId ? undefined : sessionToken,
          userId: validated.userId || undefined
        }
      });
    }

    // Upsert Item
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: validated.productId,
        variantId: validated.variantId || null
      }
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + validated.quantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: validated.productId,
          variantId: validated.variantId || undefined,
          quantity: validated.quantity
        }
      });
    }

    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true,
            variant: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      sessionToken: cart.sessionToken || sessionToken,
      cart: updatedCart
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update cart' },
      { status: 400 }
    );
  }
}
