import { attributes } from "../content/pages/our_ecosystem.md";
import { renderSections } from "../utils";

const OurEcosystem = () => {
  return renderSections(attributes.sections);
};

export default OurEcosystem;
