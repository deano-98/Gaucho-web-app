import { test, expect } from "@playwright/test";
test("customer can browse menu and add a product", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /freshly braaied chicken/i }),
  ).toBeVisible();
  await page.getByRole("link", { name: /view our menu/i }).click();
  await page.getByLabel("Flavour").first().selectOption("spicy");
  await page
    .getByRole("button", { name: /add to basket/i })
    .first()
    .click();
  await page.getByRole("link", { name: /basket with 1 items/i }).click();
  await expect(
    page.getByRole("heading", { name: /ready to order/i }),
  ).toBeVisible();
});
