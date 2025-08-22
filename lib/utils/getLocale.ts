// lib/utils/getCurrentLanguage.ts
"use server";

import { getLocale } from "next-intl/server";

export async function getCurrentLanguage(): Promise<"en" | "ar"> {
  const locale = await getLocale();
  console.log("localelocalelocale", locale);
  return (locale as "en" | "ar") || "en"; // fallback
}
