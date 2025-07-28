import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type JSONContent } from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
   return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatPrice({
   amount,
   currency,
}: {
   amount: number;
   currency: string;
}): string {
   return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
   }).format(amount);
}

export function getCurrencySign(currencyCode: string) {
   return formatPrice({
      amount: 0,
      currency: currencyCode,
   }).slice(0, -1);
}

export function formatBytes(bytes: number): string {
   if (bytes === 0) return "0 Bytes";

   const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
   const i = Math.floor(Math.log(bytes) / Math.log(1024));
   const value = bytes / Math.pow(1024, i);

   return `${parseFloat(value.toFixed(2))} ${sizes[i]}`;
}

export function slugify(input: string): string {
   if (!input) return "";

   return input
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/[\s-]+/g, "-")
      .replace(/^-+|-+$/g, "");
}
