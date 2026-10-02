import { getProduct } from "@/data/products";
import { siteConfig } from "@/data/site-config";
import type { BasketItem, ValidatedBasketItem } from "@/types/basket";
import { OrderRequestSchema, type OrderRequest } from "@/lib/validation";

export function validateAndPriceOrder(raw: unknown) {
  const parsed = OrderRequestSchema.parse(raw);
  const validatedItems: ValidatedBasketItem[] = parsed.items.map((item) => validateItem(item));
  const subtotal = roundMoney(validatedItems.reduce((sum, item) => sum + item.lineTotal, 0));
  const deliveryFee = parsed.fulfilment.method === "DELIVERY" && siteConfig.delivery.enabled ? siteConfig.delivery.fee : 0;
  return { ...parsed, items: validatedItems, subtotal, deliveryFee, total: roundMoney(subtotal + deliveryFee) };
}

function validateItem(item: BasketItem): ValidatedBasketItem {
  const product = getProduct(item.productId);
  if (!product || product.active === false) throw new Error(`Invalid or unavailable product: ${item.productId}`);

  if (product.category === "combo") {
    if (product.price == null || !product.comboComponents) throw new Error(`Combo is not configured: ${product.id}`);
    validateComboOptions(product, item.comboOptions ?? {});
    const comboLabels = getComboLabels(product, item.comboOptions ?? {});
    return {
      ...item,
      unitPrice: product.price,
      name: product.name,
      image: product.image,
      flavourLabel: comboLabels.flavourLabel,
      sizeLabel: comboLabels.sizeLabel,
      lineTotal: roundMoney(product.price * item.quantity)
    };
  }

  let unitPrice = product.price;
  let sizeLabel: string | undefined;
  let flavourLabel: string | undefined;
  let variantLabel: string | undefined;

  if (product.sizes) {
    if (!item.sizeId) throw new Error(`${product.name} requires a size.`);
    const size = product.sizes.find((option) => option.id === item.sizeId);
    if (!size || size.price == null) throw new Error(`Invalid size for ${product.name}.`);
    unitPrice = size.price;
    sizeLabel = size.label;
  }

  if (product.flavours) {
    if (!item.flavourId) throw new Error(`${product.name} requires a flavour.`);
    const flavour = product.flavours.find((option) => option.id === item.flavourId);
    if (!flavour) throw new Error(`Invalid flavour for ${product.name}.`);
    flavourLabel = flavour.label;
  }

  if (product.variants) {
    if (!item.variantId) throw new Error(`${product.name} requires a variant.`);
    const variant = product.variants.find((option) => option.id === item.variantId);
    if (!variant || variant.price == null) throw new Error(`Invalid variant for ${product.name}.`);
    unitPrice = variant.price;
    variantLabel = variant.label;
  }

  if (unitPrice == null) throw new Error(`${product.name} has no configured price.`);
  return { ...item, unitPrice, name: product.name, image: product.image, sizeLabel, flavourLabel, lineTotal: roundMoney(unitPrice * item.quantity), variantLabel };
}

function getComboLabels(product: NonNullable<ReturnType<typeof getProduct>>, options: Record<string, string[]>) {
  const flavours: string[] = [];
  const sizes: string[] = [];
  for (const component of product.comboComponents ?? []) {
    const child = getProduct(component.productId);
    if (!child) continue;
    if (component.fixedOptionId && component.optionType === "size") {
      const size = child.sizes?.find((s) => s.id === component.fixedOptionId);
      if (size) sizes.push(`${child.name}: ${size.label}`);
    }
    if (component.optionType === "flavour" && !component.fixedOptionId) {
      for (const id of (options[component.productId] ?? []).slice(0, component.quantity)) {
        const flavour = child.flavours?.find((f) => f.id === id);
        if (flavour) flavours.push(`${child.name}: ${flavour.label}`);
      }
    }
  }
  return { flavourLabel: flavours.join(", ") || undefined, sizeLabel: sizes.join(", ") || undefined };
}

function validateComboOptions(product: NonNullable<ReturnType<typeof getProduct>>, options: Record<string, string[]>) {
  for (const component of product.comboComponents ?? []) {
    const child = getProduct(component.productId);
    if (!child) throw new Error(`Combo contains invalid product: ${component.productId}`);
    if (component.fixedOptionId) {
      if (component.optionType === "size" && !child.sizes?.some((s) => s.id === component.fixedOptionId)) throw new Error("Invalid fixed combo size.");
      continue;
    }
    if (!component.optionType) continue;
    const selected = options[component.productId] ?? [];
    if (selected.length < component.quantity) throw new Error(`${product.name} requires all flavour choices.`);
    for (const id of selected.slice(0, component.quantity)) {
      if (component.optionType === "flavour" && !child.flavours?.some((f) => f.id === id)) throw new Error(`Invalid combo flavour for ${child.name}.`);
      if (component.optionType === "size" && !child.sizes?.some((s) => s.id === id)) throw new Error(`Invalid combo size for ${child.name}.`);
    }
  }
}

export function calculateComboRegularPrice(productId: string) {
  const product = getProduct(productId);
  if (!product?.comboComponents) return 0;
  return roundMoney(product.comboComponents.reduce((sum, component) => {
    const child = getProduct(component.productId);
    if (!child) return sum;
    let unit = child.price ?? 0;
    if (component.fixedOptionId && component.optionType === "size") unit = child.sizes?.find((s) => s.id === component.fixedOptionId)?.price ?? 0;
    if (component.fixedOptionId && component.optionType === "flavour") unit = child.price ?? 0;
    return sum + unit * component.quantity;
  }, 0));
}

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
