"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { initializeFromLocale, setLanguage } from "@/lib/redux/features/language/languageSlice";
import { useEffect } from "react";
import { useLocale } from "next-intl";

export default function ToggleLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const locale = useLocale();

  // ✅ read language from Redux only
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  const handleToggle = () => {
    const nextLang = currentLanguage === "en" ? "ar" : "en";

    // update redux store
    dispatch(setLanguage(nextLang));

    // push new locale to Next.js router
    router.push(`${pathname}?${searchParams.toString()}`, { locale: nextLang });
  };
  useEffect(() => {
    // Initialize Redux state with current locale
    dispatch(initializeFromLocale(locale));
  }, [locale, dispatch]);

  return (
    <Button variant="ghost" size="sm" onClick={handleToggle} className="text-white hover:bg-white/10 flex items-center space-x-1">
      <Globe className="h-4 w-4" />
      <span>{currentLanguage.toUpperCase()}</span>
    </Button>
  );
}
