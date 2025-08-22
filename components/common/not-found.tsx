import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type NotFoundComponentProps = {
  children?: React.ReactNode;
};

export default function NotFoundComponent({ children }: NotFoundComponentProps) {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col gap-6 text-center justify-center items-center h-full">
      {/* Headline */}
      <h1 className="text-9xl text-red-500 font-bold">404</h1>

      {/* Not found message */}
      <p className="px-3 py-2 rounded-full bg-red-50 text-red-400 border border-red-500">{children || t("not-found")}</p>

      {/* Homepage link */}
      <Link href="/">{t("to-hompage-link")}</Link>
    </section>
  );
}
