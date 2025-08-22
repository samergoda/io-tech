"use server";

import { getLocale } from "next-intl/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:1337/api";
console.log("API_URL", API_URL);
export const fetchTeam = async () => {
  const locale = (await getLocale().catch(() => "en")) || "en";
  const res = await fetch(`${API_URL}/members?locale=${locale}`);
  const data = await res.json();
  // console.log("data", data.data.length);
  // if (data.data.length == 0) {
  //   throw new Error("No teams found");
  // }

  return data;
};

export const fetchHeroAssets = async () => {
  const locale = (await getLocale().catch(() => "en")) || "en";
  const res = await fetch(`${API_URL}/hero-sliders?locale=${locale}`);
  const data = await res.json();
  // console.log("service service service service", data.data.length);
  // if (data.data.length == 0) {
  //   throw new Error("No service found");
  // }

  return data;
};

export const fetchServices = async () => {
  try {
    const locale = (await getLocale().catch(() => "en")) || "en";
    const res = await fetch(`${API_URL}/services?locale=${locale}&populate=*`);
    const data = await res.json();

    // if (data.data.length == 0) {
    //   throw new Error("No service found");
    // }

    return data;
  } catch (err) {
    throw new Error("Failed to fetch services: " + err);
  }
};

export const fetchHeroBG = async () => {
  const locale = (await getLocale().catch(() => "en")) || "en";
  const res = await fetch(`${API_URL}/bg-hero?locale=${locale}`);
  const data = await res.json();
  console.log("fetchHeroBG0", data.data.length);
  // if (data.data.length == 0) {
  //   throw new Error("No service found");
  // }

  return data;
};

export const fetchServiceById = async (id: string) => {
  const locale = (await getLocale().catch(() => "en")) || "en";
  const res = await fetch(`${API_URL}/services/${id}?locale=${locale}&populate=*`);
  const data = await res.json();

  if (data.data.length == 0) {
    throw new Error("No service found");
  }

  return data;
};

export const searchMembers = async (endpoint: string, query = "") => {
  const locale = (await getLocale().catch(() => "en")) || "en";
  const res = await fetch(
    `${API_URL}/${endpoint}?populate=*&filters[name][$containsi]=${query}&locale=${locale}`
  );
  const data = await res.json();

  return data;
};

export const searchServices = async (endpoint: string, query = "") => {
  const locale = (await getLocale().catch(() => "en")) || "en";
  const res = await fetch(
    `${API_URL}/${endpoint}?populate=*&filters[title][$containsi]=${query}&locale=${locale}`
  );
  const data = await res.json();

  return data;
};

export const handleSubscription = async (email: string) => {
  const res = await fetch(`${API_URL}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: { email } }),
  });
  const data = await res.json();

  return data;
};
