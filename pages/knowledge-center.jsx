import { attributes } from "../content/pages/knowledge_center.md";
import { renderSections } from "../utils";
import { Seo } from "../components/Seo";
import { faqSchema, webPageSchema } from "../lib/schema";

const faqSection = attributes.sections?.find((section) => section.type === "faqs");

const KnowledgeCenter = () => (
  <>
    <Seo
      {...attributes.seo}
      path="/knowledge-center"
      schema={[
        webPageSchema("Knowledge Center", "/knowledge-center", attributes.seo?.description),
        ...(faqSection ? [faqSchema(faqSection.questions)] : []),
      ]}
    />
    {renderSections(attributes.sections)}
  </>
);

export default KnowledgeCenter;
