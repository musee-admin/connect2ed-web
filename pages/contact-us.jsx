import { attributes } from "../content/pages/contact_us.md";
import { renderSections } from "../utils";

const ContactUs = () => {
  return renderSections(attributes.sections);
};

export default ContactUs;
