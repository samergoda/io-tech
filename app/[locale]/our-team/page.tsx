import Image from "next/image";
import { fetchTeam } from "@/lib/api/strapi";

export default async function TeamPage() {
  const { data: team } = await fetchTeam();

  return (
    <section className="max-w-7xl mt-32 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Our Team</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member: Member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition hover:shadow-lg"
          >
            <div className="w-32 h-32 relative mb-4">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover rounded-full border-4 border-main-color"
              />
            </div>
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{member.position}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
