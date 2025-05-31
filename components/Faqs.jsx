import styles from "./Faqs.module.css";
import { Accordion } from "@radix-ui/react-accordion";

export const Faqs = ({ questions }) => {
  return <section className={styles.wrapper}></section>;
};

const FaqItem = () => {
  return (
    <Accordion.Root>
      <Accordion.Item>
        <Accordion.Header>
          <Accordion.Trigger />
        </Accordion.Header>
        <Accordion.Content />
      </Accordion.Item>
    </Accordion.Root>
  );
};
