import { attributes } from "../content/pages/our_solution.md";
import { renderSections } from "../utils";

const OurSolution = () => {
  return renderSections(attributes.sections);
};

export default OurSolution;
