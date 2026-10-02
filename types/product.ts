export type ProductCategory =
  "chicken" | "wings" | "dessert" | "side" | "combo";
export type Flavour = string;
export type ChickenSize = "small" | "medium" | "large";

export interface ProductVariant {
  id: string;
  label: string;
  price: number | null;
  description?: string;
}

export interface ProductOption {
  id: string;
  label: string;
  required?: boolean;
}

export interface ComboComponent {
  productId: string;
  quantity: number;
  optionType?: "flavour" | "size";
  fixedOptionId?: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  description: string;
  image: string;
  price: number | null;
  variants?: ProductVariant[];
  flavours?: ProductOption[];
  sizes?: ProductVariant[];
  comboComponents?: ComboComponent[];
  featured?: boolean;
  active?: boolean;
}
