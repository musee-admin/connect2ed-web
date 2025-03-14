import { attributes } from "../content/pages/home.md";
import { renderSections } from "../utils";

const HomePage = () => {
  return renderSections(attributes.sections);
};

export default HomePage;
