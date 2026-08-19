import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-01-27.acacia' as any
});

const CheckoutSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().min(1),
      price: z.number(),
      title: z.string(),
      image: z.string().optional()
    })
  ),
  shippingAddress: z.object({
    fullName: z.string(),
    email: z.string().email(),
    street: z.string(),
    city: z.string(),
    country: z.string()
  }),
  couponCode: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CheckoutSchema.parse(body);

    let discountPercent = 0;
    if (validated.couponCode) {
      const coupon = await prisma.discountCode.findUnique({
        where: { code: validated.couponCode.toUpperCase() }
      });
      if (coupon && coupon.isActive) {
        discountPercent = coupon.value;
      }
    }

    const lineItems = validated.items.map((item) => {
      const discountedPrice = Math.max(0, item.price * (1 - discountPercent / 100));
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : []
          },
          unit_amount: Math.round(discountedPrice * 100)
        },
        quantity: item.quantity
      };
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // If Stripe secret key is available in real integration, create checkout session
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'sk_test_mock') {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${appUrl}/checkout?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/checkout?status=cancel`,
        customer_email: validated.shippingAddress.email,
        metadata: {
          shippingAddress: JSON.stringify(validated.shippingAddress),
          couponCode: validated.couponCode || ''
        }
      });

      return NextResponse.json({
        success: true,
        sessionId: session.id,
        url: session.url
      });
    }

    // Mock fallback checkout session response for zero-config testing
    const orderNumber = 'DROP-' + Math.floor(10000 + Math.random() * 90000);
    const subtotal = validated.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    const totalAmount = Math.max(0, subtotal * (1 - discountPercent / 100));

    const order = await prisma.order.create({
      data: {
        orderNumber,
        guestEmail: validated.shippingAddress.email,
        status: 'PROCESSING',
        paymentStatus: 'PAID',
        fulfillmentStatus: 'PENDING',
        totalAmount,
        subtotal,
        discountAmount: subtotal - totalAmount,
        couponCode: validated.couponCode || undefined,
        trackingNumber: 'CJ-TRK-' + Math.floor(10000000 + Math.random() * 90000000),
        carrier: 'FedEx Express Air',
        estimatedDelivery: '3-5 Business Days',
        shippingAddress: JSON.stringify(validated.shippingAddress),
        items: {
          create: validated.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId || undefined,
            sku: 'SKU-' + item.productId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image || ''
          }))
        }
      }
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      trackingNumber: order.trackingNumber,
      totalAmount: order.totalAmount,
      message: 'Order created successfully!'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create checkout session' },
      { status: 400 }
    );
  }
}
