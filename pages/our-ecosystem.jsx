import { attributes } from "../content/pages/our_ecosystem.md";
import { renderSections } from "../utils";
import { Seo } from "../components/Seo";
import { webPageSchema } from "../lib/schema";

const OurEcosystem = () => (
  <>
    <Seo
      {...attributes.seo}
      path="/our-ecosystem"
      schema={webPageSchema("Our Ecosystem", "/our-ecosystem", attributes.seo?.description)}
    />
    {renderSections(attributes.sections)}
  </>
);

export default OurEcosystem;
