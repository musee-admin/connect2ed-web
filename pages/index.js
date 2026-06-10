import { attributes } from "../content/pages/home.md";
import { renderSections } from "../utils";
import { Seo } from "../components/Seo";
import { organizationSchema, webSiteSchema, softwareSchema } from "../lib/schema";

const HomePage = () => (
  <>
    <Seo
      {...attributes.seo}
      path="/"
      schema={[organizationSchema, webSiteSchema, softwareSchema]}
    />
    {renderSections(attributes.sections)}
  </>
);

export default HomePage;
