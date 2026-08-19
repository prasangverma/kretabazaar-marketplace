import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CreateReviewSchema = z.object({
  productId: z.string(),
  authorName: z.string().min(2),
  authorEmail: z.string().email(),
  rating: z.number().min(1).max(5),
  title: z.string().optional(),
  comment: z.string().min(5),
  mediaUrls: z.array(z.string()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = CreateReviewSchema.parse(body);

    // Verify if email has purchased this product
    const previousOrder = await prisma.order.findFirst({
      where: {
        guestEmail: validated.authorEmail,
        paymentStatus: 'PAID',
        items: {
          some: {
            productId: validated.productId
          }
        }
      }
    });

    const isVerifiedBuyer = Boolean(previousOrder);

    const review = await prisma.review.create({
      data: {
        productId: validated.productId,
        authorName: validated.authorName,
        authorEmail: validated.authorEmail,
        rating: validated.rating,
        title: validated.title || undefined,
        comment: validated.comment,
        mediaUrls: validated.mediaUrls ? JSON.stringify(validated.mediaUrls) : undefined,
        isVerifiedBuyer
      }
    });

    // Update product average rating
    const aggregate = await prisma.review.aggregate({
      where: { productId: validated.productId },
      _avg: { rating: true },
      _count: { rating: true }
    });

    if (aggregate._avg.rating) {
      await prisma.product.update({
        where: { id: validated.productId },
        data: {
          rating: Math.round(aggregate._avg.rating * 10) / 10,
          reviewsCount: aggregate._count.rating
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: review,
      message: isVerifiedBuyer ? 'Verified Review submitted!' : 'Review submitted!'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to submit review' },
      { status: 400 }
    );
  }
}
