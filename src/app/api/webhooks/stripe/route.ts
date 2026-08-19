import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
  apiVersion: '2025-01-27.acacia' as any
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (webhookSecret && webhookSecret !== 'whsec_mock_stripe_webhook_secret') {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: `Webhook Signature Verification Failed: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      const orderNumber = 'DROP-' + Math.floor(10000 + Math.random() * 90000);
      const trackingNumber = 'CJ-TRK-' + Math.floor(10000000 + Math.random() * 90000000);

      const metadata = session.metadata || {};
      const shippingAddress = metadata.shippingAddress || '{}';
      const couponCode = metadata.couponCode || null;

      // Retrieve session line items
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      // Create Order & Decrement Stock
      await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            orderNumber,
            stripeSessionId: session.id,
            guestEmail: session.customer_email || 'customer@kretabazaar.com',
            status: 'PROCESSING',
            paymentStatus: 'PAID',
            fulfillmentStatus: 'PENDING',
            totalAmount: (session.amount_total || 0) / 100,
            subtotal: (session.amount_subtotal || 0) / 100,
            trackingNumber,
            carrier: 'FedEx Express Air',
            estimatedDelivery: '3-5 Business Days',
            shippingAddress,
            couponCode,
            items: {
              create: lineItems.data.map((item) => ({
                productId: item.id,
                sku: 'SKU-' + item.id,
                title: item.description || 'Custom Product',
                price: (item.amount_total || 0) / 100,
                quantity: item.quantity || 1,
                image: ''
              }))
            }
          }
        });

        // Decrement Inventory for products
        for (const item of lineItems.data) {
          const matchingProduct = await tx.product.findFirst({
            where: { title: item.description || '' }
          });
          if (matchingProduct) {
            await tx.product.update({
              where: { id: matchingProduct.id },
              data: {
                stockQuantity: Math.max(0, matchingProduct.stockQuantity - (item.quantity || 1))
              }
            });
          }
        }
      });

      console.log(`[Stripe Webhook] Order ${orderNumber} created & inventory decremented successfully.`);
      console.log(`[Email Trigger Mock] Order confirmation email sent to ${session.customer_email}`);
    } catch (err: any) {
      console.error('[Stripe Webhook Error] Failed to record order:', err.message);
      return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
