import { attributes } from "../content/pages/about_us.md";
import { renderSections } from "../utils";
import { Seo, SITE_URL } from "../components/Seo";
import { organizationSchema } from "../lib/schema";

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Link2Ed",
  url: `${SITE_URL}/about-us`,
};

const AboutUs = () => (
  <>
    <Seo {...attributes.seo} path="/about-us" schema={[aboutPageSchema, organizationSchema]} />
    {renderSections(attributes.sections)}
  </>
);

export default AboutUs;
