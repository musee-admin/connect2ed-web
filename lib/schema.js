import { attributes as basic } from "../content/pages/basic.md";
import { SITE_URL } from "../components/Seo";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Link2Ed",
  legalName: "Link2Ed Technology Solutions",
  url: SITE_URL,
  logo: `${SITE_URL}/${basic.full_logo}`,
  email: basic.email_id,
  telephone: basic.phone_number,
  address: {
    "@type": "PostalAddress",
    streetAddress: "No 9, Manjushree, Portion No.7, 4th floor, West Link, Malleswaram",
    addressLocality: "Bangalore",
    postalCode: "560003",
    addressCountry: "IN",
  },
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Link2Ed",
  url: SITE_URL,
};

export const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Link2Ed",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  description:
    "A purpose-built platform for school psychology and special education teams, bringing collaboration, progress tracking, standardised workflows, and secure data management together in one place.",
  url: SITE_URL,
  publisher: { "@type": "Organization", name: "Link2Ed" },
};

export const webPageSchema = (name, path, description) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name,
  url: `${SITE_URL}${path}`,
  description,
  isPartOf: { "@type": "WebSite", name: "Link2Ed", url: SITE_URL },
});

export const faqSchema = (questions) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
});
