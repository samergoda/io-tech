import { useTranslations } from "next-intl";

type ErrorComponentProps = {
  children?: React.ReactNode;
  onRetry?: () => void;
};

export default function ErrorComponent({ children, onRetry }: ErrorComponentProps) {
  // Translation
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center justify-center h-full w-full text-center py-10 px-6  rounded-lg shadow-md">
      {/* Big title */}
      <h1 className="text-main-color  text-5xl font-extrabold mb-4">{t("error")}</h1>

      {/* Error message */}
      <p className="text-gray-700 text-lg mb-2">{children || t("something-went-wrong")}</p>

      {/* Retry suggestion */}
      <p className="text-gray-500 mb-4">{t("please-try-again")}</p>

      {/* Try again */}
      <button onClick={onRetry} className="mt-2 px-5 py-2 bg-main-color text-white rounded-full  transition">
        {t("retry")}
      </button>
    </section>
  );
}
