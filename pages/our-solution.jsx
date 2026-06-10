import { attributes } from "../content/pages/our_solution.md";
import { renderSections } from "../utils";
import { Seo } from "../components/Seo";
import { softwareSchema, webPageSchema } from "../lib/schema";

const OurSolution = () => (
  <>
    <Seo
      {...attributes.seo}
      path="/our-solution"
      schema={[
        softwareSchema,
        webPageSchema("Our Solution", "/our-solution", attributes.seo?.description),
      ]}
    />
    {renderSections(attributes.sections)}
  </>
);

export default OurSolution;
