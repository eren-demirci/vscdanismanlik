import type { Metadata } from "next";
import { fonts } from "@/libs/fonts";
import "@/styles/global.css";
import "@/styles/footer.css";
import "@/styles/modal.css";
import AosInitializer from "@/libs/aos";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ScrollTop from "@/components/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Header2 from "@/components/HeaderStyle2";

export const metadata: Metadata = {
  title: {
    template: "%s | VSC Danışmanlık",
    default: "VSC Danışmanlık A.Ş.",
  },
  description:
    "VSC Danışmanlık A.Ş., sürdürülebilirlik, kurumsal finans, vergi, denetim ve yönetim danışmanlığı alanlarında bütüncül çözümler sunar.",
  openGraph: {
    title: "VSC Danışmanlık A.Ş.",
    description:
      "Sürdürülebilirlik, kurumsal finansman, vergi danışmanlığı, bağımsız denetim ve yönetim danışmanlığında güvenilir iş ortağınız.",
    url: "https://vscdanismanlik.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={fonts}>
        <Header2 />
        <main>{children}</main>
        <Footer />

        {/* Modal and Drawer Overlay */}
        <drawer-opener id="drawer-overlay"></drawer-opener>

        {/* AOS Init */}
        <AosInitializer />

        {/* Scroll to Top Button */}
        <ScrollTop />

        {/* Vercel Speed Insights */}
        <SpeedInsights />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
