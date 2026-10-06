"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderRequestSchema } from "@/lib/validation";
import type { z } from "zod";
import { siteConfig } from "@/data/site-config";
import { useBasket } from "@/context/BasketContext";
import { trackEvent } from "@/lib/analytics";
import { useRouter } from "next/navigation";

type FormValues = z.input<typeof OrderRequestSchema>;

export function OrderForm() {
  const { items, clearBasket } = useBasket();
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(OrderRequestSchema),
    defaultValues: {
      idempotencyKey: "",
      customer: { fullName: "", phone: "", email: "" },
      fulfilment: { method: "PICKUP", pickupLocation: "WESTGATE" },
      items,
    },
  });
  const method = watch("fulfilment.method");
  const deliveryAddressError =
    method === "DELIVERY"
      ? (
          errors.fulfilment as
            | {
                deliveryAddress?: { message?: string };
              }
            | undefined
        )?.deliveryAddress?.message
      : undefined;

  useEffect(() => {
    setValue("idempotencyKey", crypto.randomUUID(), { shouldValidate: true });
  }, [setValue]);

  async function submit(values: FormValues) {
    setSubmitting(true);
    setServerError("");
    trackEvent("order_submission_attempt");
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, items }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Could not create the order.");
      clearBasket();
      trackEvent("order_created", { order_number_present: true });
      window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      router.push(
        `/order-confirmation?order=${encodeURIComponent(data.orderNumber)}&whatsapp=${encodeURIComponent(data.whatsappUrl)}`,
      );
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const ErrorText = ({ message }: { message?: string }) =>
    message ? (
      <p className="mt-1 text-xs font-bold text-red-700" role="alert">
        {message}
      </p>
    ) : null;
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
      noValidate
      data-clarity-mask="true"
    >
      <input type="hidden" {...register("idempotencyKey")} />
      <div>
        <h2 className="font-display text-2xl font-black uppercase">
          Your details
        </h2>
        <div className="mt-4 grid gap-4">
          <label className="text-sm font-bold">
            Full name
            <input
              data-clarity-mask="true"
              {...register("customer.fullName")}
              className="mt-1 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-3 text-white"
              autoComplete="name"
            />{" "}
            <ErrorText message={errors.customer?.fullName?.message} />
          </label>
          <label className="text-sm font-bold">
            Phone
            <input
              data-clarity-mask="true"
              {...register("customer.phone")}
              className="mt-1 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-3 text-white"
              autoComplete="tel"
              inputMode="tel"
            />{" "}
            <ErrorText message={errors.customer?.phone?.message} />
          </label>
          <label className="text-sm font-bold">
            Email
            <input
              data-clarity-mask="true"
              {...register("customer.email")}
              className="mt-1 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-3 text-white"
              autoComplete="email"
              inputMode="email"
            />{" "}
            <ErrorText message={errors.customer?.email?.message} />
          </label>
        </div>
      </div>
      <fieldset>
        <legend className="font-display text-2xl font-black uppercase">
          Fulfilment
        </legend>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="rounded-xl border border-white/15 bg-charcoal p-4 font-bold">
            <input
              type="radio"
              value="PICKUP"
              {...register("fulfilment.method")}
            />{" "}
            <span className="ml-2">Pickup</span>
          </label>
          <label className="rounded-xl border border-white/15 bg-charcoal p-4 font-bold">
            <input
              type="radio"
              value="DELIVERY"
              {...register("fulfilment.method")}
            />{" "}
            <span className="ml-2">Delivery</span>
          </label>
        </div>
        {method === "PICKUP" ? (
          <label className="mt-4 block text-sm font-bold">
            Pickup location
            <select
              {...register("fulfilment.pickupLocation")}
              className="mt-1 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-3 text-white"
            >
              <option value="WESTGATE">Westgate</option>
              <option value="AVONDALE">Avondale</option>
            </select>
          </label>
        ) : (
          <label className="mt-4 block text-sm font-bold">
            Delivery address
            <textarea
              data-clarity-mask="true"
              {...register("fulfilment.deliveryAddress")}
              rows={4}
              className="mt-1 w-full rounded-xl border border-white/15 bg-charcoal px-4 py-3 text-white"
              placeholder="Enter your delivery address"
            />
            <ErrorText message={deliveryAddressError} />
          </label>
        )}
        {method === "DELIVERY" && !siteConfig.delivery.enabled && (
          <p className="mt-2 rounded-xl bg-gold/30 p-3 text-xs font-bold">
            Delivery fees and availability are confirmed by the business.
          </p>
        )}
      </fieldset>
      {serverError && (
        <p
          className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-800"
          role="alert"
        >
          {serverError}
        </p>
      )}
      <button
        disabled={submitting || !items.length}
        className="w-full rounded-full bg-whatsapp px-6 py-4 font-black text-white disabled:opacity-50"
      >
        {submitting ? "Creating order…" : "Place Order on WhatsApp"}
      </button>
      <p className="text-center text-xs leading-5 text-white/60">
        Your order is created first. WhatsApp then opens with a prefilled
        message — please send it and wait for business confirmation.
      </p>
    </form>
  );
}
