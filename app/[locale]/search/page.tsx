import { Link } from "@/i18n/routing";
import { searchMembers, searchServices } from "@/lib/api/strapi";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  // Translation
  const t = await getTranslations();

  const { q: query } = await searchParams; //

  // Fetch data on the server
  const [teamData, serviceData] = query
    ? await Promise.all([searchMembers("members", query), searchServices("services", query)])
    : [{ data: [] }, { data: [] }];

  const teams = teamData.data || [];
  const services = serviceData.data || [];

  return (
    <div className="p-6 mt-32">
      <h1 className="text-2xl mb-4 dark:text-white">
        {t("search-results")}: <span className="font-semibold">{query}</span>
      </h1>

      {/* Teams */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2 dark:text-white">{t("team")}</h2>
        {teams.length ? (
          <ul className="flex items-center flex-wrap gap-5">
            {teams.map((t: Member) => (
              <li
                key={t.id}
                className="flex dark:text-white flex-col text-center justify-center items-center space-x-4"
              >
                <Image
                  src={t.image || ""}
                  width={100}
                  height={100}
                  alt={t.name}
                  className="object-contain rounded"
                />
                <div>
                  <p className="font-semibold dark:text-white">{t.name}</p>
                  <p className="text-sm dark:text-white text-gray-400">{t.position}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white dark:text-white">{t("no-team-members-found")}</p>
        )}
      </div>

      {/* Services */}
      <div>
        <h2 className="text-xl font-bold mb-2">{t("services")}</h2>
        {services.length ? (
          <ul className="flex flex-wrap items-center gap-5">
            {services.map((s: Service) => (
              <li
                key={s.id}
                className="flex flex-col text-center justify-center items-center space-x-4"
              >
                <Link href={`/service/${s.documentId}`}>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>{t("no-services-found")}</p>
        )}
      </div>
    </div>
  );
}
