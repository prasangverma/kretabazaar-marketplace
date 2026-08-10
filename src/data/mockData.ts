import { CustomProduct, Seller, Coupon } from '@/types';

export const SELLERS: Seller[] = [
  {
    id: 's-1',
    name: 'Apex Design Atelier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    title: 'Hardware & EDC Goods',
    badge: 'OFFICIAL STORE',
    rating: 4.9,
    salesCount: 1420
  },
  {
    id: 's-2',
    name: 'Acoustica Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    title: 'Audiophile Sound Gear',
    badge: 'TOP CREATOR',
    rating: 4.8,
    salesCount: 980
  },
  {
    id: 's-3',
    name: 'PixelCraft Digital',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    title: 'UI Kits & 3D Assets',
    badge: 'VERIFIED SELLER',
    rating: 5.0,
    salesCount: 3410
  },
  {
    id: 's-4',
    name: 'Vanguard Leather Studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    title: 'Handcrafted Goods',
    badge: 'OFFICIAL STORE',
    rating: 4.9,
    salesCount: 620
  }
];

export const PRODUCTS: CustomProduct[] = [
  {
    id: 'prod-1',
    title: 'Acoustica Spatial Pro ANC Headphones',
    subtitle: 'Beryllium Drivers & Dynamic Head Tracking',
    description: 'Precision studio-grade active noise canceling headphones featuring custom 40mm beryllium diaphragms, 45-hour battery life, and Bluetooth 5.3 spatial audio.',
    price: 349.99,
    originalPrice: 499.99,
    category: 'Audio',
    primaryImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop'
    ],
    seller: SELLERS[1],
    stockCount: 14,
    inStock: true,
    variants: [
      { id: 'v1', name: 'Stealth Black', color: '#18181B', priceOffset: 0, inStock: true },
      { id: 'v2', name: 'Matte Silver', color: '#E4E4E7', priceOffset: 20, inStock: true }
    ],
    specifications: {
      'Driver Unit': '40mm Beryllium Diaphragm',
      'Battery Duration': '45 Hours ANC On',
      'Connectivity': 'Bluetooth 5.3 / USB-C Audio',
      'Weight': '248g'
    },
    tags: ['Audio', 'Headphones', 'Wireless', 'Noise Canceling'],
    isFeatured: true,
    isTrending: true,
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'prod-2',
    title: 'Apex OS UI Design System (Figma Kit)',
    subtitle: '500+ Components & Auto-Layout 5.0 Variables',
    description: 'The ultimate design system for SaaS dashboards, mobile apps, and spatial computing interfaces. Includes light/dark mode variables, micro-animations, and full commercial license.',
    price: 79.00,
    originalPrice: 149.00,
    category: 'Digital Goods',
    primaryImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'
    ],
    seller: SELLERS[2],
    stockCount: 999,
    inStock: true,
    variants: [
      { id: 'v3', name: 'Commercial License', priceOffset: 0, inStock: true },
      { id: 'v4', name: 'Enterprise Team License', priceOffset: 120, inStock: true }
    ],
    specifications: {
      'File Format': 'Figma (.fig) & Tokens JSON',
      'Updates': 'Lifetime Free Version Updates',
      'License': 'Commercial Unlimited Projects'
    },
    tags: ['Figma', 'UI Kit', 'Design System', 'Digital Asset'],
    isFeatured: true,
    isTrending: true,
    rating: 5.0,
    reviewsCount: 389
  },
  {
    id: 'prod-3',
    title: 'Solstice Titanium RFID Cardholder Wallet',
    subtitle: 'Aerospace Grade 5 Titanium & Money Clip',
    description: 'Ultra-slim aerospace titanium minimalist wallet with spring-loaded cash clip and military-grade 13.56 MHz RFID signal protection. Holds up to 12 cards.',
    price: 89.50,
    originalPrice: 120.00,
    category: 'Accessories',
    primaryImage: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
    ],
    seller: SELLERS[0],
    stockCount: 18,
    inStock: true,
    variants: [
      { id: 'v5', name: 'Titanium Gunmetal', color: '#3F3F46', priceOffset: 0, inStock: true },
      { id: 'v6', name: 'Carbon Weave', color: '#09090B', priceOffset: 15, inStock: true }
    ],
    specifications: {
      'Material': 'Grade 5 Titanium',
      'Capacity': '1 to 12 Cards + Cash Clip',
      'Protection': '13.56 MHz RFID Shielding'
    },
    tags: ['Accessories', 'Wallet', 'Titanium', 'EDC'],
    isFeatured: false,
    isTrending: true,
    rating: 4.8,
    reviewsCount: 96
  },
  {
    id: 'prod-4',
    title: 'Vanguard Tuscan Full-Grain Leather Duffle',
    subtitle: 'Hand-Stitched Florence Leather Weekender',
    description: 'Handcrafted in Florence from Tuscan vegetable-tanned full-grain leather. Includes solid antique brass zippers and a dedicated padded 16-inch laptop pocket.',
    price: 489.00,
    originalPrice: 699.00,
    category: 'Accessories',
    primaryImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop'
    ],
    seller: SELLERS[3],
    stockCount: 6,
    inStock: true,
    variants: [
      { id: 'v7', name: 'Cognac Brown', color: '#78350F', priceOffset: 0, inStock: true },
      { id: 'v8', name: 'Espresso Black', color: '#1C1917', priceOffset: 0, inStock: true }
    ],
    specifications: {
      'Dimensions': '52 x 28 x 26 cm',
      'Capacity': '42 Liters',
      'Laptop Pocket': 'Fits up to 16" MacBook Pro'
    },
    tags: ['Leather', 'Travel', 'Duffle', 'Handmade'],
    isFeatured: true,
    isTrending: false,
    rating: 4.9,
    reviewsCount: 54
  },
  {
    id: 'prod-5',
    title: 'MagCharge 3-in-1 CNC Aluminum Dock',
    subtitle: 'Fast Wireless Charging for Desk & Studio',
    description: 'Machined from a single block of anodized CNC aluminum. Fast-charges your phone, smartwatch, and wireless earbuds simultaneously with 15W MagSafe output.',
    price: 129.99,
    originalPrice: 189.99,
    category: 'Electronics',
    primaryImage: 'https://images.unsplash.com/photo-1622445268465-843dcb402b1f?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1622445268465-843dcb402b1f?q=80&w=1000&auto=format&fit=crop'
    ],
    seller: SELLERS[0],
    stockCount: 22,
    inStock: true,
    variants: [
      { id: 'v9', name: 'Space Gray', color: '#3F3F46', priceOffset: 0, inStock: true },
      { id: 'v10', name: 'Silver Anodized', color: '#E4E4E7', priceOffset: 0, inStock: true }
    ],
    specifications: {
      'Fast Charge Output': '15W MagSafe Compatible',
      'Materials': 'CNC Aluminum & Matte Silicone',
      'Power Input': 'USB-C Power Delivery 30W'
    },
    tags: ['Electronics', 'Wireless Charger', 'Desk Setup'],
    isFeatured: false,
    isTrending: true,
    rating: 4.7,
    reviewsCount: 118
  },
  {
    id: 'prod-6',
    title: 'Kretabazaar Heavyweight Oversized Hoodie',
    subtitle: '480 GSM Organic French Terry Cotton',
    description: 'Crafted from ultra-heavyweight 480 GSM organic combed French terry cotton with reinforced ribbed cuffs, drop shoulders, and subtle embroidered minimalist chest branding.',
    price: 98.00,
    originalPrice: 140.00,
    category: 'Apparel',
    primaryImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop'
    ],
    seller: SELLERS[0],
    stockCount: 30,
    inStock: true,
    variants: [
      { id: 'v11', name: 'Washed Charcoal', color: '#27272A', size: 'Medium', priceOffset: 0, inStock: true },
      { id: 'v12', name: 'Off-White Cream', color: '#F4F4F5', size: 'Large', priceOffset: 0, inStock: true }
    ],
    specifications: {
      'Fabric Weight': '480 GSM Heavyweight French Terry',
      'Fit': 'Boxy Oversized Drop Shoulder',
      'Care': 'Pre-shrunk Machine Wash Cold'
    },
    tags: ['Apparel', 'Hoodie', 'Streetwear', 'Cotton'],
    isFeatured: true,
    isTrending: true,
    rating: 4.9,
    reviewsCount: 78
  }
];

export const MOCK_COUPONS: Coupon[] = [
  { code: 'KRETA15', discountPercent: 15, minAmount: 50 },
  { code: 'VIP20', discountPercent: 20, minAmount: 150 },
  { code: 'FREESHIP', discountPercent: 10, minAmount: 30 }
];
