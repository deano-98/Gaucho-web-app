import { describe, expect, it } from "vitest";
import { generateOrderNumber } from "@/lib/order-number";
describe("order numbers", () => { it("creates unique formatted values", () => { const a = generateOrderNumber(); const b = generateOrderNumber(); expect(a).toMatch(/^BC-\d{8}-[A-F0-9]{8}$/); expect(a).not.toBe(b); }); });
