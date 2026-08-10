export interface Seller {
  id: string;
  name: string;
  avatar: string;
  title: string;
  badge?: 'VERIFIED SELLER' | 'TOP CREATOR' | 'OFFICIAL STORE';
  rating: number;
  salesCount: number;
}

export type ProductCategory = 'Apparel' | 'Electronics' | 'Digital Goods' | 'Accessories' | 'Home & Studio' | 'Audio';

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  priceOffset?: number;
  inStock: boolean;
}

export interface CustomProduct {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  category: ProductCategory;
  primaryImage: string;
  images: string[];
  seller: Seller;
  stockCount: number;
  inStock: boolean;
  variants: ProductVariant[];
  specifications: Record<string, string>;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  id: string;
  product: CustomProduct;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minAmount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'seller' | 'admin';
  savedProductIds: string[];
}

export interface Order {
  id: string;
  trackingNumber: string;
  createdAt: string;
  totalAmount: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  items: {
    productId: string;
    productTitle: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
  };
}
