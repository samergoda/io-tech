import { fetchTeam } from "@/lib/api/strapi";
import TeamSlider from "./team-slider";
import { getTranslations } from "next-intl/server";

export default async function OurTeam() {
  // Translation
  const t = await getTranslations();

  // Request
  const { data: team } = await fetchTeam();

  return (
    <section className="bg-custom-gray py-28">
      <div>
        <div className="text-center mb-20">
          {/* Title */}
          <h2 className="text-4xl font-bold text-main-color capitalize">{t("our-team")}</h2>
          {/* Description */}
          <p className="text-custom-black mt-4 text-lg">{t("our-team-desc")}</p>
        </div>
      </div>

      {/* Team Slider */}
      <TeamSlider members={team} />
    </section>
  );
}
