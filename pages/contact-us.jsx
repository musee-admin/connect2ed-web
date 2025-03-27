import { attributes } from "../content/pages/our_ecosystem.md";
import { renderSections } from "../utils";

const ContactUs = () => {
  return renderSections(attributes.sections);
};

export default ContactUs;
