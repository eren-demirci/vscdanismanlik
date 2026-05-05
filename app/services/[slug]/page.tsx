import type { Metadata } from 'next';
import BreadcrumbBannerImage from '@/public/img/banner/page-banner.jpg';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/services';

import BreadcrumbBanner from "@/components/BreadcrumbBanner";
import ServiceDetails from '@/components/sections/ServiceDetails';

const PAGE_TITLE: string = 'Hizmet Detayı';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: PAGE_TITLE,
      description: "Hizmet detayı bulunamadı.",
    };
  }

  const title = service.title || PAGE_TITLE;
  const description =
    service.description ||
    `${title} hizmeti hakkında kapsam, metodoloji ve sık sorulan sorular.`;
  const image = service.image || BreadcrumbBannerImage.src;
  const canonicalUrl = `/services/${slug}`;
  const faqQuestions = (service.faqs ?? []).map((faq) => faq.title).slice(0, 8);

  return {
    title,
    description,
    keywords: [title, ...faqQuestions],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: image }],
      type: "article",
      locale: "tr_TR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

const Page = async ({ params }: {params: Promise<{slug: string}>}) => {
    const { slug } = await params;
    const service = await getServiceBySlug(slug);

    if (!service) {
      notFound();
    }

    const serviceTitle = service.title || PAGE_TITLE;
    const serviceDescription =
      service.description ||
      `${serviceTitle} hizmeti hakkında kapsam, süreçler ve uygulama detayları.`;
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceTitle,
      description: serviceDescription,
      serviceType: serviceTitle,
      url: `https://vscdanismanlik.com/services/${slug}`,
      provider: {
        "@type": "Organization",
        name: "VSC Danışmanlık A.Ş.",
        url: "https://vscdanismanlik.com",
      },
    };
    const faqSchemaSeed = (service.faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.text,
      },
    }));

    return (
        <>
            <BreadcrumbBanner 
                title={serviceTitle}
                variant="premium"
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
              id="service-faq-schema-seed"
              type="application/json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaSeed) }}
            />
            <ServiceDetails container="container" data={service} />
        </>
    )
}

export default Page;
