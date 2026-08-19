import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || searchParams.get('trackingNumber') || searchParams.get('orderNumber');

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Tracking number or Order ID is required' },
        { status: 400 }
      );
    }

    const cleanQuery = query.trim();

    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderNumber: { equals: cleanQuery } },
          { trackingNumber: { equals: cleanQuery } }
        ]
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: `No active shipment found matching "${cleanQuery}".` },
        { status: 404 }
      );
    }

    let parsedAddress = {};
    try {
      parsedAddress = JSON.parse(order.shippingAddress);
    } catch (e) {
      parsedAddress = { raw: order.shippingAddress };
    }

    return NextResponse.json({
      success: true,
      data: {
        id: order.id,
        orderNumber: order.orderNumber,
        trackingNumber: order.trackingNumber,
        status: order.status,
        paymentStatus: order.paymentStatus,
        fulfillmentStatus: order.fulfillmentStatus,
        carrier: order.carrier || 'FedEx Express Air',
        estimatedDelivery: order.estimatedDelivery || '3-5 Business Days',
        shippingAddress: parsedAddress,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        items: order.items
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tracking details' },
      { status: 500 }
    );
  }
}
