import { attributes } from "../content/pages/knowledge_center.md";
import { renderSections } from "../utils";

const KnowledgeCenter = () => {
  return renderSections(attributes.sections);
};

export default KnowledgeCenter;
