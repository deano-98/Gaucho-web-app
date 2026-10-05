import { prisma } from "../lib/prisma";

async function main() {
  console.log("Connecting to database...");

  const result = await prisma.$queryRaw<
    { result: number }[]
  >`SELECT 1 AS result`;

  console.log("Database connection successful:", result);

  const order = await prisma.order.create({
    data: {
      orderNumber: `TEST-${Date.now()}`,
      idempotencyKey: `TEST-${crypto.randomUUID()}`,
      fullName: "Database Test",
      phone: "+263000000000",
      email: "database-test@example.com",
      fulfilment: "PICKUP",
      pickupLocation: "WESTGATE",
      subtotal: 10,
      deliveryFee: 0,
      total: 10,
      items: {
        create: [
          {
            productId: "test-product",
            productName: "Database Test Chicken",
            quantity: 1,
            unitPrice: 10,
            lineTotal: 10,
          },
        ],
      },
    },
  });

  console.log("Test order created:", order.orderNumber);
}

main()
  .catch((error) => {
    console.error("Database test failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });