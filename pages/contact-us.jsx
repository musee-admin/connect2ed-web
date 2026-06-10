import { attributes } from "../content/pages/contact_us.md";
import { renderSections } from "../utils";
import { Seo, SITE_URL } from "../components/Seo";
import { organizationSchema } from "../lib/schema";

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Link2Ed",
  url: `${SITE_URL}/contact-us`,
};

const ContactUs = () => (
  <>
    <Seo {...attributes.seo} path="/contact-us" schema={[contactPageSchema, organizationSchema]} />
    {renderSections(attributes.sections)}
  </>
);

export default ContactUs;
