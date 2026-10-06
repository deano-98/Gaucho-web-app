import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "wings-15",
    category: "wings",
    name: "15 Wings",
    description: "Charcoal-braaied wings with your choice of flavour.",
    image: "/images/wings/wings_2.jpg",
    price: 8,
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy(Medium)", required: true },
      { id: "bbq", label: "BBQ", required: true },
    ],
    featured: true,
    active: true,
  },
  {
    id: "wings-30",
    category: "wings",
    name: "30 Wings",
    description: "A bigger wing box for sharing or serious hunger.",
    image: "/images/wings/wings.jpg",
    price: 14,
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy(Medium)", required: true },
      { id: "bbq", label: "BBQ", required: true },
    ],
    active: true,
  },
  {
    id: "wingless-bird",
    category: "chicken",
    name: "Wingless Bird",
    description: "Whole charcoal-braaied chicken, without wings.",
    image: "/images/chicken/hero_2.jpg",
    price: 8,
    sizes: [
      { id: "medium", label: "Medium", price: 7 },
      { id: "large", label: "Large", price: 8 },
    ],
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy(Medium)", required: true },
      { id: "bbq", label: "BBQ", required: true },
    ],
    featured: true,
    active: true,
  },
  {
    id: "full-chicken",
    category: "chicken",
    name: "Full Chicken",
    description: "Full chicken with wings included.",
    image: "/images/chicken/hero_2.jpg",
    price: null,
    sizes: [
      { id: "medium", label: "Medium", price: 9 },
      { id: "large", label: "Large", price: 10 },
    ],
    flavours: [
      { id: "classic", label: "Classic", required: true },
      { id: "spicy", label: "Spicy(Medium)", required: true },
      { id: "bbq", label: "BBQ", required: true },
    ],
    active: true,
  },
  {
    id: "cake-box",
    category: "dessert",
    name: "Small Cake Box",
    description: "A small box of cake made for a sweet finish. Enough for 2-3 people.",
    image: "/images/desserts/cake.jpg",
    price: 12,
    flavours: [
      { id: "peach", label: "Peach", required: true },
      { id: "chocolate-mousse", label: "Chocolate Mousse", required: true },
      { id: "black-forest", label: "Black Forest", required: true },
      { id: "mint", label: "Mint", required: true },
    ],
    active: true,
  },
  {
    id: "cheesecake-slice",
    category: "dessert",
    name: "Burnt Cheesecake Slice",
    description: "A slice of creamy burnt cheesecake.",
    image: "/images/desserts/cheesecake.jpg",
    price: 5,
    flavours: [
      { id: "vanilla", label: "Vanilla", required: true },
      { id: "banana", label: "Banana", required: true },
    ],
    active: true,
  },
  {
    id: "plain-bun",
    category: "side",
    name: "Plain Bun",
    description: "A simple side to complete your braai meal.",
    image: "/images/chicken/bun.jpeg",
    price: 0.5,
    active: true,
  },


  ///////////////// Product combos start here ///////////////////////////////////////////////////


  {
    id: "combo-wingless-bird-15-wings",
    category: "combo",
    name: "Wingless Bird + 15 Wings",
    description: "A large wingless bird plus 15 wings.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 15,
    comboComponents: [
      {
        productId: "chicken-wingless",
        quantity: 1,
        optionType: "size",
        fixedOptionId: "large",
      },
      { productId: "wings-15", quantity: 1, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-2-wingless-birds-15-wings",
    category: "combo",
    name: "2 Large Wingless Birds + 15 Wings",
    description: "Two large wingless birds plus 15 wings.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 20,
    comboComponents: [
      {
        productId: "chicken-wingless",
        quantity: 2,
        optionType: "size",
        fixedOptionId: "large",
      },
      { productId: "wings-15", quantity: 1, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-large-chicken-cake-box",
    category: "combo",
    name: "Large Chicken + Cake Box",
    description: "Large chicken and a cake box.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 20,
    comboComponents: [
      {
        productId: "full-chicken",
        quantity: 1,
        optionType: "size",
        fixedOptionId: "large",
      },
      { productId: "cake-box", quantity: 1, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-wingless-bird-cake-box",
    category: "combo",
    name: "Wingless Bird + Cake Box",
    description: "Wingless bird and a cake box.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 16,
    comboComponents: [
      {
        productId: "chicken-wingless",
        quantity: 1,
        optionType: "size",
        fixedOptionId: "large",
      },
      { productId: "cake-box", quantity: 1, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-large-chicken-2-cheesecake",
    category: "combo",
    name: "Large Chicken + 2 Cheesecake Slices",
    description: "Large chicken with two cheesecake slices.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 18,
    comboComponents: [
      {
        productId: "full-chicken",
        quantity: 1,
        optionType: "size",
        fixedOptionId: "large",
      },
      { productId: "cheesecake-slice", quantity: 2, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-wingless-bird-2-cheesecake",
    category: "combo",
    name: "Wingless Bird + 2 Cheesecake Slices",
    description: "Wingless bird with two cheesecake slices.",
    image: "/images/chicken/chicken-placeholder.svg",
    price: 15,
    comboComponents: [
      {
        productId: "chicken-wingless",
        quantity: 1,
        optionType: "size",
        fixedOptionId: "large",
      },
      { productId: "cheesecake-slice", quantity: 2, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-15-wings-cheesecake",
    category: "combo",
    name: "15 Wings + Cheesecake Slice",
    description: "15 wings and one cheesecake slice.",
    image: "/images/wings/wings-placeholder.svg",
    price: 10,
    comboComponents: [
      { productId: "wings-15", quantity: 1, optionType: "flavour" },
      { productId: "cheesecake-slice", quantity: 1, optionType: "flavour" },
    ],
    active: true,
  },
  {
    id: "combo-15-wings-cake-box",
    category: "combo",
    name: "15 Wings + Cake Box",
    description: "15 wings and one small cake box.",
    image: "/images/wings/wings-placeholder.svg",
    price: 18,
    comboComponents: [
      { productId: "wings-15", quantity: 1, optionType: "flavour" },
      { productId: "cake-box", quantity: 1, optionType: "flavour" },
    ],
    active: true,
  },
];

export const activeProducts = products.filter(
  (product) => product.active !== false,
);
export const getProduct = (id: string) =>
  products.find((product) => product.id === id);
