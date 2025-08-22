import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FaFacebookF, FaGooglePlusG, FaTwitter } from "react-icons/fa";
import SubscribeForm from "./subscribe-form";

export default function Footer() {
  // Translation
  const t = useTranslations();

  const navigationLinks = [t("about-us"), t("our-strategy"), t("our-advantages"), t("social-responsibility"), t("our-services")];

  return (
    <footer className="bg-main-color text-white px-6 lg:px-20 xl:px-28 pt-6 lg:pt-8 xl:pt-16 pb-10 mt-6">
      {/* Subscription form */}
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-end gap-6 mb-9">
        {/* Email Subscription Form */}
        <div className="flex-shrink-0">
          <SubscribeForm />
        </div>

        {/* Right Social Icons and Copyright */}
        <div className="flex items-center gap-4 text-sm">
          <span className="">{t("contacts")}</span>

          {/* Social Media Icons */}
          <div className="flex gap-2">
            <a href="#" className="hover: transition-colors duration-200" aria-label="Twitter">
              <FaTwitter size={16} className="text-white" />
            </a>
            <a href="#" className="hover: transition-colors duration-200" aria-label="Facebook">
              <FaFacebookF size={16} className="text-white" />
            </a>
            <a href="#" className="hover: transition-colors duration-200" aria-label="Google Plus">
              <FaGooglePlusG size={16} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex justify-between flex-wrap gap-6 text-sm pt-9  border-t">
        <div className="flex justify-between flex-wrap gap-6 text-sm">
          {navigationLinks.map((link, index) => (
            <Link key={index} href="#" className=" hover: transition-colors duration-200">
              {link}
            </Link>
          ))}
        </div>
        <span className="">© {t("2024-all-rights-reserved")}</span>
      </div>
    </footer>
  );
}
