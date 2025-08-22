import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl";

import { getFormats } from "@/i18n/request";
import { Locale } from "@/i18n/routing";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function RootProviders({ children }: ProvidersProps) {
  //Translation
  const locale = useLocale();
  const messages = useMessages();
  const now = useNow();
  const timezone = useTimeZone();

  return (
    <NextIntlClientProvider messages={messages} locale={locale} now={now} timeZone={timezone} formats={getFormats(locale as Locale)}>
      {children}
    </NextIntlClientProvider>
  );
}
