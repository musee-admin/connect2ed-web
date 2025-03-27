import { attributes } from "../content/pages/our_ecosystem.md";
import { renderSections } from "../utils";

const AboutUs = () => {
  return renderSections(attributes.sections);
};

export default AboutUs;
