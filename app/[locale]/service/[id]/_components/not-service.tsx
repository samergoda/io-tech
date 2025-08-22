import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";

export default function NotService() {
  // Translation
  const t = useTranslations();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-main-color mb-4">{t("service-not-found")}</h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          {t("return-to-home")}
        </Link>
      </div>
    </div>
  );
}
