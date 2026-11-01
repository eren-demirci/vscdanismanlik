import type { MetadataRoute } from "next";
import TeamList from "@/data/teams.json";
import { getAllServices } from "@/lib/services";

const BASE_URL = "https://vscdanismanlik.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const services = await getAllServices();
  const paths = [
    "",
    "/about-us",
    "/services",
    "/teams",
    "/blogs/category/duyurular",
    "/blogs/category/haberler",
    "/contact-us",
    "/faq",
    "/privacy-policy",
    "/terms-condition",
    ...services.map((service) => `/services/${service.slug}`),
    ...TeamList.map((member) => `/teams/${member.slug}`),
  ];

  return paths.map((path) => ({ url: `${BASE_URL}${path}` }));
}
