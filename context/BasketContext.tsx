"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { BasketItem } from "@/types/basket";
import { calculateBasketTotal, makeLineId } from "@/lib/basket";

interface BasketContextValue {
  items: BasketItem[];
  hydrated: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (
    item: Omit<BasketItem, "lineId" | "unitPrice"> & { unitPrice: number },
  ) => void;
  removeItem: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  clearBasket: () => void;
}

const BasketContext = createContext<BasketContextValue | null>(null);
const STORAGE_KEY = "braai-chicken:basket:v1";

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as BasketItem[]);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (
      incoming: Omit<BasketItem, "lineId" | "unitPrice"> & {
        unitPrice: number;
      },
    ) => {
      const lineId = makeLineId(incoming);
      setItems((current) => {
        const existing = current.find((item) => item.lineId === lineId);
        if (existing)
          return current.map((item) =>
            item.lineId === lineId
              ? {
                  ...item,
                  quantity: Math.min(50, item.quantity + incoming.quantity),
                }
              : item,
          );
        return [...current, { ...incoming, lineId }];
      });
    },
    [],
  );

  const removeItem = useCallback(
    (lineId: string) =>
      setItems((current) => current.filter((item) => item.lineId !== lineId)),
    [],
  );
  const setQuantity = useCallback(
    (lineId: string, quantity: number) => {
      if (quantity <= 0) return removeItem(lineId);
      setItems((current) =>
        current.map((item) =>
          item.lineId === lineId
            ? { ...item, quantity: Math.min(50, quantity) }
            : item,
        ),
      );
    },
    [removeItem],
  );
  const clearBasket = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: calculateBasketTotal(items),
      addItem,
      removeItem,
      setQuantity,
      clearBasket,
    }),
    [items, hydrated, addItem, removeItem, setQuantity, clearBasket],
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

export function useBasket() {
  const context = useContext(BasketContext);
  if (!context) throw new Error("useBasket must be used inside BasketProvider");
  return context;
}
