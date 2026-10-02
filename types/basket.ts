export interface BasketItem {
  lineId: string;
  productId: string;
  quantity: number;
  flavourId?: string;
  sizeId?: string;
  variantId?: string;
  comboOptions?: Record<string, string[]>;
  unitPrice: number;
}

export interface ValidatedBasketItem extends BasketItem {
  name: string;
  image: string;
  flavourLabel?: string;
  sizeLabel?: string;
  lineTotal: number;
}
