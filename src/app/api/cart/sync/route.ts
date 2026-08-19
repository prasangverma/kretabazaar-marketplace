import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const SyncCartSchema = z.object({
  sessionToken: z.string(),
  userId: z.string()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionToken, userId } = SyncCartSchema.parse(body);

    const guestCart = await prisma.cart.findUnique({
      where: { sessionToken },
      include: { items: true }
    });

    if (!guestCart || guestCart.items.length === 0) {
      return NextResponse.json({ success: true, message: 'No guest items to sync' });
    }

    let userCart = await prisma.cart.findFirst({
      where: { userId }
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { userId }
      });
    }

    // Merge guest cart items into user cart
    for (const item of guestCart.items) {
      const existingUserItem = await prisma.cartItem.findFirst({
        where: {
          cartId: userCart.id,
          productId: item.productId,
          variantId: item.variantId
        }
      });

      if (existingUserItem) {
        await prisma.cartItem.update({
          where: { id: existingUserItem.id },
          data: { quantity: existingUserItem.quantity + item.quantity }
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity
          }
        });
      }
    }

    // Delete guest cart after sync
    await prisma.cart.delete({
      where: { id: guestCart.id }
    });

    const finalCart = await prisma.cart.findUnique({
      where: { id: userCart.id },
      include: {
        items: {
          include: { product: true, variant: true }
        }
      }
    });

    return NextResponse.json({
      success: true,
      cart: finalCart
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to sync cart' },
      { status: 400 }
    );
  }
}
