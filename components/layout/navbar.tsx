"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "@/i18n/routing";
import { fetchServices } from "@/lib/api/strapi";
import { useTranslations } from "next-intl";
import ToggleLanguage from "./toggle-language";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { setQuery, toggleSearch } from "@/lib/redux/features/search/searchSlice";
import { ModeToggle } from "../feature/toggle-dark-theme";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = useTranslations();
  const dispatch = useDispatch();

  // Redux search state
  const { query, isOpen } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    async function handleGetService() {
      const services = await fetchServices();
      setServicesData(services.data);
    }
    handleGetService();
  }, []);

  // Handle Search Submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed w-full z-50 text-white transition-colors duration-300 top-0 ${
        scrolled ? "bg-main-color" : "lg:bg-transparent bg-main-color"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image width={70} height={0} src="/logo.png" alt="Al Safar & Partners" priority />
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden lg:block ${isOpen ? "hidden" : ""}`}>
            <NavigationMenu>
              <NavigationMenuList
                className={`flex items-center space-x-8 ${isOpen ? "hidden" : ""}`}
              >
                <NavigationMenuItem>
                  <Link href="/" className=" transition-colors px-3 py-2"></Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" className=" transition-colors px-3 py-2">
                    {t("about-us")}
                  </Link>
                </NavigationMenuItem>

                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent   hover:bg-white/10 data-[state=open]:bg-white/10 ">
                    {t("services")}
                  </NavigationMenuTrigger>

                  {/* Service content */}
                  <NavigationMenuContent className="w-auto bg-main-color  shadow-xl rounded-md overflow-hidden">
                    <div className="w-full min-w-[850px] max-w-6xl p-6">
                      <div className="flex flex-wrap gap-6">
                        {servicesData.map((service: Service) => (
                          <div key={service.id} className="space-y-3 min-w-0">
                            <Link
                              href={`/service/${service.documentId}`}
                              className="text-white  text-sm pb-2 truncate"
                            >
                              {service.title}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/" className="text-white  transition-colors px-3 py-2">
                    {t("blog")}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" className="text-white  transition-colors px-3 py-2">
                    {t("our-team")}
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/" className="text-white  transition-colors px-3 py-2">
                    {t("contact-us")}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Side Controls (Desktop) */}
          <div
            className={` ${
              isOpen ? "flex-1" : ""
            } hidden md:flex items-center space-x-4  justify-end`}
          >
            {/* Search */}
            <div className={`relative ${isOpen ? "flex-1 mx-4" : ""}`}>
              {isOpen ? (
                <form onSubmit={handleSearch} className="flex items-center w-full">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => dispatch(setQuery(e.target.value))}
                    placeholder="Search..."
                    className="w-full mx-8  border border-white/20 rounded-md px-3 py-1 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(toggleSearch())}
                    className="ml-2 text-white  "
                  >
                    <X className="h-4 w-4 " />
                  </Button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  aria-label="Open search"
                  size="sm"
                  onClick={() => dispatch(toggleSearch())}
                  className="text-white"
                >
                  <Search className="h-4 w-4 " />
                </Button>
              )}
            </div>

            {/* Toggle language */}
            <ToggleLanguage />

            {/* Toggle theme */}
            <ModeToggle />

            {/* Book Appointment */}
            <Button
              variant="outline"
              className="border-white text-white  hover:bg-white hover:text-main-color transition-colors bg-transparent whitespace-nowrap"
            >
              {t("book-appointment")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className={`lg:hidden ${isOpen ? "hidden" : ""}`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t  border-white/20">
            <div className="px-2 pt-2 pb-3 space-y-1 overflow-y-scroll h-[calc(100vh-4rem)]">
              <Link
                className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                href="/"
              >
                {t("home")}
              </Link>
              <Link
                className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                href="/"
              >
                {t("about-us")}
              </Link>

              {/* Mobile Services */}
              <div className="space-y-1">
                <div className="px-3 py-2 text-white font-medium text-sm border-b border-white/20">
                  {t("services")}
                </div>
                <div className="pl-6 space-y-1">
                  {servicesData.map((service: Service) => (
                    <div key={service.id} className="space-y-1">
                      <Link
                        href={`/service/${service.documentId}`}
                        className="text-white/80 text-xs font-medium py-1"
                      >
                        {service.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                href="/"
              >
                {t("blog")}
              </Link>
              <Link
                className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                href="/"
              >
                {t("our-team")}
              </Link>
              <Link
                className="block px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
                href="/"
              >
                {t("contact-us")}
              </Link>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-3 py-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => dispatch(setQuery(e.target.value))}
                  placeholder="Search..."
                  className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </form>

              <div className="flex gap-4 px-3 py-2 items-center justify-between">
                {/* Mobile Language Toggle */}
                <ToggleLanguage />

                {/* Toggle theme */}
                <ModeToggle />
              </div>

              {/* Mobile Book Appointment */}
              <div className="px-3 py-2">
                <Button
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-main-color bg-transparent"
                >
                  {t("book-appointment")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
