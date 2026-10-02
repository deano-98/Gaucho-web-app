export interface BasketItemInput {
  lineId: string;
  productId: string;
  quantity: number;
  flavourId?: string;
  sizeId?: string;
  variantId?: string;
  comboOptions?: Record<string, string[]>;
}

// Client-side basket item, including its display price.
export interface BasketItem extends BasketItemInput {
  unitPrice: number;
}

// Server-validated item with trusted pricing and product details.
export interface ValidatedBasketItem extends BasketItem {
  name: string;
  image: string;
  flavourLabel?: string;
  sizeLabel?: string;
  variantLabel?: string;
  lineTotal: number;
}
