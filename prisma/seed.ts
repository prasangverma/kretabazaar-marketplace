import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding dropshipping database...');

  // Categories
  const apparelCat = await prisma.category.upsert({
    where: { slug: 'apparel' },
    update: {},
    create: {
      name: 'Apparel',
      slug: 'apparel',
      description: 'Heavyweight organic streetwear & designer apparel',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
    }
  });

  const electronicsCat = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Desk setups, wireless docks, and smart tech',
      image: 'https://images.unsplash.com/photo-1622445268465-843dcb402b1f?q=80&w=1000&auto=format&fit=crop'
    }
  });

  const digitalCat = await prisma.category.upsert({
    where: { slug: 'digital-goods' },
    update: {},
    create: {
      name: 'Digital Goods',
      slug: 'digital-goods',
      description: 'Figma UI kits, 3D asset packs, and design tokens',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
    }
  });

  const audioCat = await prisma.category.upsert({
    where: { slug: 'audio' },
    update: {},
    create: {
      name: 'Audio',
      slug: 'audio',
      description: 'Audiophile spatial headphones and studio acoustic gear',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
    }
  });

  const accessoriesCat = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Titanium RFID wallets, Tuscan leather bags, and EDC gear',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    }
  });

  // Coupons
  await prisma.discountCode.upsert({
    where: { code: 'KRETA15' },
    update: {},
    create: {
      code: 'KRETA15',
      discountType: 'PERCENTAGE',
      value: 15.0,
      minAmount: 50.0,
      isActive: true
    }
  });

  // Products
  const headphonesProduct = await prisma.product.upsert({
    where: { sku: 'PROD-HEADPHONES-01' },
    update: {},
    create: {
      sku: 'PROD-HEADPHONES-01',
      title: 'Acoustica Spatial Pro ANC Headphones',
      slug: 'acoustica-spatial-pro-anc-headphones',
      subtitle: 'Beryllium Drivers & Dynamic Head Tracking',
      description: 'Precision studio-grade active noise canceling headphones featuring custom 40mm beryllium diaphragms, 45-hour battery life, and Bluetooth 5.3 spatial audio.',
      price: 349.99,
      compareAtPrice: 499.99,
      supplierCost: 110.0,
      stockQuantity: 14,
      inStock: true,
      primaryImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
      ]),
      tags: 'Audio,Headphones,Wireless,Noise Canceling',
      isFeatured: true,
      isTrending: true,
      rating: 4.9,
      reviewsCount: 142,
      categoryId: audioCat.id,
      variants: {
        create: [
          { sku: 'HEADPHONES-BLK', name: 'Stealth Black', color: '#18181B', priceOffset: 0.0, stockQuantity: 8 },
          { sku: 'HEADPHONES-SLV', name: 'Matte Silver', color: '#E4E4E7', priceOffset: 20.0, stockQuantity: 6 }
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { sku: 'PROD-FIGMA-01' },
    update: {},
    create: {
      sku: 'PROD-FIGMA-01',
      title: 'Apex OS UI Design System (Figma Kit)',
      slug: 'apex-os-ui-design-system-figma-kit',
      subtitle: '500+ Components & Auto-Layout 5.0 Variables',
      description: 'The ultimate design system for SaaS dashboards, mobile apps, and spatial computing interfaces. Includes light/dark mode variables, micro-animations, and full commercial license.',
      price: 79.00,
      compareAtPrice: 149.00,
      supplierCost: 0.0,
      stockQuantity: 999,
      inStock: true,
      primaryImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop'
      ]),
      tags: 'Figma,UI Kit,Design System,Digital Asset',
      isFeatured: true,
      isTrending: true,
      rating: 5.0,
      reviewsCount: 389,
      categoryId: digitalCat.id
    }
  });

  // Sample Order
  await prisma.order.upsert({
    where: { orderNumber: 'DROP-89421' },
    update: {},
    create: {
      orderNumber: 'DROP-89421',
      guestEmail: 'prasang@luxury.com',
      status: 'SHIPPED',
      paymentStatus: 'PAID',
      fulfillmentStatus: 'SHIPPED',
      totalAmount: 349.99,
      subtotal: 349.99,
      shippingCost: 0.0,
      trackingNumber: 'CJ-TRK-99021882',
      carrier: 'FedEx Express Air',
      estimatedDelivery: 'August 22, 2026',
      shippingAddress: JSON.stringify({
        fullName: 'Prasang Kumar',
        street: '742 Evergreen Terrace',
        city: 'San Francisco',
        country: 'United States'
      }),
      items: {
        create: [
          {
            productId: headphonesProduct.id,
            sku: 'PROD-HEADPHONES-01',
            title: 'Acoustica Spatial Pro ANC Headphones',
            price: 349.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop'
          }
        ]
      }
    }
  });

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
