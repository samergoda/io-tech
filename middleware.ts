import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files
  // - _next
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
