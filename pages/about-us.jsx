import { attributes } from "../content/pages/about_us.md";
import { renderSections } from "../utils";

const AboutUs = () => {
  return renderSections(attributes.sections);
};

export default AboutUs;
