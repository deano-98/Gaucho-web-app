import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "wings-15",
    category: "wings",
    name: "15 Wings",
    description: "Charcoal-braaied wings with your choice of flavour.",
    image: "/images/wings/wings-placeholder.svg",
    price: 8,
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy", required: true },
      { id: "bbq", label: "BBQ", required: true }
    ],
    featured: true,
    active: true
  },
  {
    id: "wings-30",
    category: "wings",
    name: "30 Wings",
    description: "A bigger wing box for sharing or serious hunger.",
    image: "/images/wings/wings-placeholder.svg",
    price: 14,
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy", required: true },
      { id: "bbq", label: "BBQ", required: true }
    ],
    active: true
  },
  {
    id: "chicken-wingless",
    category: "chicken",
    name: "Wingless Chicken",
    description: "Whole charcoal-braaied chicken, priced by configured size.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: null,
    sizes: [
      { id: "small", label: "Small", price: 6.5 },
      { id: "medium", label: "Medium", price: 7.25 },
      { id: "large", label: "Large", price: 8 }
    ],
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy", required: true },
      { id: "bbq", label: "BBQ", required: true }
    ],
    featured: true,
    active: true
  },
  {
    id: "chicken-winged",
    category: "chicken",
    name: "Winged Chicken",
    description: "Whole charcoal-braaied chicken with wings included.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: null,
    sizes: [
      { id: "small", label: "Small", price: 8 },
      { id: "medium", label: "Medium", price: 8.75 },
      { id: "large", label: "Large", price: 9.5 }
    ],
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy", required: true },
      { id: "bbq", label: "BBQ", required: true }
    ],
    active: true
  },
  {
    id: "cake-box",
    category: "dessert",
    name: "Small Cake Box",
    description: "A small box of cake made for a sweet finish.",
    image: "/images/desserts/cake-placeholder.svg",
    price: 10,
    flavours: [
      { id: "peach", label: "Peach", required: true },
      { id: "chocolate-mousse", label: "Chocolate Mousse", required: true },
      { id: "black-forest", label: "Black Forest", required: true },
      { id: "mint", label: "Mint", required: true }
    ],
    active: true
  },
  {
    id: "cheesecake-slice",
    category: "dessert",
    name: "Burnt Cheesecake Slice",
    description: "Creamy burnt cheesecake slice with a flavour choice.",
    image: "/images/desserts/cheesecake-placeholder.svg",
    price: 5,
    flavours: [
      { id: "vanilla", label: "Vanilla", required: true },
      { id: "banana", label: "Banana", required: true }
    ],
    active: true
  },
  {
    id: "plain-bun",
    category: "side",
    name: "Plain Bun",
    description: "A simple side to complete your braai meal.",
    image: "/images/chicken/bun-placeholder.svg",
    price: 0.5,
    active: true
  },
  {
    id: "combo-2x15-wings",
    category: "combo",
    name: "2 × 15 Wings",
    description: "Two 15-wing portions at a promotional price.",
    image: "/images/wings/wings-placeholder.svg",
    price: 15,
    comboComponents: [{ productId: "wings-15", quantity: 2, optionType: "flavour" }],
    active: true
  },
  {
    id: "combo-large-chicken-15-wings",
    category: "combo",
    name: "Large Chicken + 15 Wings",
    description: "A large chicken plus 15 wings.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 16,
    comboComponents: [
      { productId: "chicken-wingless", quantity: 1, optionType: "size", fixedOptionId: "large" },
      { productId: "wings-15", quantity: 1, optionType: "flavour" }
    ],
    active: true
  },
  {
    id: "combo-2-large-chickens-15-wings",
    category: "combo",
    name: "2 Large Chickens + 15 Wings",
    description: "Two large chickens plus 15 wings.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 23,
    comboComponents: [
      { productId: "chicken-wingless", quantity: 2, optionType: "size", fixedOptionId: "large" },
      { productId: "wings-15", quantity: 1, optionType: "flavour" }
    ],
    active: true
  },
  {
    id: "combo-large-chicken-cake-box",
    category: "combo",
    name: "Large Chicken + Cake Box",
    description: "Large chicken and a small cake box.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 17,
    comboComponents: [
      { productId: "chicken-wingless", quantity: 1, optionType: "size", fixedOptionId: "large" },
      { productId: "cake-box", quantity: 1, optionType: "flavour" }
    ],
    active: true
  },
  {
    id: "combo-large-chicken-2-cheesecake",
    category: "combo",
    name: "Large Chicken + 2 Cheesecake Slices",
    description: "Large chicken with two cheesecake slices.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 18,
    comboComponents: [
      { productId: "chicken-wingless", quantity: 1, optionType: "size", fixedOptionId: "large" },
      { productId: "cheesecake-slice", quantity: 2, optionType: "flavour" }
    ],
    active: true
  },
  {
    id: "combo-15-wings-cheesecake",
    category: "combo",
    name: "15 Wings + Cheesecake Slice",
    description: "15 wings and one cheesecake slice.",
    image: "/images/wings/wings-placeholder.svg",
    price: 12,
    comboComponents: [
      { productId: "wings-15", quantity: 1, optionType: "flavour" },
      { productId: "cheesecake-slice", quantity: 1, optionType: "flavour" }
    ],
    active: true
  },
  {
    id: "combo-15-wings-cake-box",
    category: "combo",
    name: "15 Wings + Cake Box",
    description: "15 wings and one small cake box.",
    image: "/images/wings/wings-placeholder.svg",
    price: 17,
    comboComponents: [
      { productId: "wings-15", quantity: 1, optionType: "flavour" },
      { productId: "cake-box", quantity: 1, optionType: "flavour" }
    ],
    active: true
  }
];

export const activeProducts = products.filter((product) => product.active !== false);
export const getProduct = (id: string) => products.find((product) => product.id === id);
