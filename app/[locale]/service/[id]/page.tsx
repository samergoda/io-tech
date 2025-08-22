import { Link } from "@/i18n/routing";
import { fetchServiceById } from "@/lib/api/strapi";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import NotService from "./_components/not-service";

interface Constriction {
  id: number;
  title: string;
  description: string;
  items?: string[];
}

// Update the params type to be a Promise
export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params promise
  const { id } = await params;

  const { data: service } = await fetchServiceById(id);
  const t = await getTranslations();

  if (!service) return <NotService />;

  return (
    <div className="min-h-screen bg-[url('/Bitmap.png')]  py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="flex gap-1 items-end text-gray-600 hover:text-main-color mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2 rtl:rotate-180" />
          {t("back")}
        </Link>

        {/* Main Content */}
        <div className=" rounded-lg  p-8">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-main-color mb-6">{service.title}</h1>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed mb-8 text-base">{service.description}</p>

          {/* Service Sections */}
          {service.constrictions?.map((constriction: Constriction) => (
            <div key={constriction.id} className="mb-8">
              <h2 className="text-xl font-semibold text-main-color mb-4">{constriction.title}</h2>

              <div className="flex items-start border-l pl-8 mb-4">
                <div className="w-2 h-2 bg-main-color rounded-none mt-2 mr-4 flex-shrink-0"></div>
                <p className="text-custom-black leading-relaxed">{constriction.description}</p>
              </div>

              {/* Advisory Services List */}
              {constriction.items && constriction.items.length > 0 && (
                <div className="ml-6">
                  <p className="text-gray-700 font-medium mb-3">Our advisory services about:</p>
                  <ul className="space-y-2">
                    {constriction.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-main-color mr-3">-</span>
                        <span className="text-custom-black">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Closing Statement */}
          <div className="border-t pt-6 mt-8">
            <p className="text-gray-700 leading-relaxed">{t("service-statment")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
