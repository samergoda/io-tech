"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
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

  // Read language from Redux only
  const { currentLanguage } = useSelector((state: RootState) => state.language);

  const handleChange = (lang: "en" | "ar") => {
    // Update redux store
    dispatch(setLanguage(lang));

    // Push new locale to Next.js router
    router.push(`${pathname}?${searchParams.toString()}`, { locale: lang });
  };

  useEffect(() => {
    // Initialize Redux state with current locale
    dispatch(initializeFromLocale(locale));
  }, [locale, dispatch]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white  hover:bg-white/10 flex items-center space-x-1"
        >
          <span>{currentLanguage.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28">
        <DropdownMenuItem onClick={() => handleChange("en")}>English</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange("ar")}>العربية</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
