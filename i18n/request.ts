import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";
import { Formats } from "next-intl";
export const getFormats = (locale: Locale): Formats => {
  return {
    number: {
      digit: {
        numberingSystem: locale === "ar" ? "arab" : "latn",
      },
      currency: {
        numberingSystem: locale === "ar" ? "arab" : "latn",
        style: "currency",
        currency: "EGP",
      },
      "currency-no-fraction": {
        numberingSystem: locale === "ar" ? "arab" : "latn",
        style: "currency",
        currency: "EGP",
        maximumFractionDigits: 0,
      },
      percentage: {
        numberingSystem: locale === "ar" ? "arab" : "latn",
        style: "percent",
        minimumFractionDigits: 0,
      },
    },
  };
};
export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = ((await requestLocale) as Locale) || "en";

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    formats: getFormats(locale),
  };
});
