import { Fragment } from "react";
import { Hero } from "./sections/Hero";
import { IntroColumns } from "./sections/IntroColumns";
import { FeatureGrid } from "./sections/FeatureGrid";
import { MediaCards } from "./sections/MediaCards";
import { Steps } from "./sections/Steps";
import { FeatureSplit } from "./sections/FeatureSplit";
import { Cards } from "./sections/Cards";
import { Team } from "./sections/Team";
import { Ecosystem } from "./sections/Ecosystem";
import { Faqs } from "./sections/Faqs";
import { StatCallout } from "./sections/StatCallout";
import { Contact } from "./sections/Contact";

const SECTION_COMPONENTS = {
  hero: Hero,
  intro_columns: IntroColumns,
  feature_grid: FeatureGrid,
  media_cards: MediaCards,
  steps: Steps,
  feature_split: FeatureSplit,
  cards: Cards,
  team: Team,
  ecosystem: Ecosystem,
  faqs: Faqs,
  stat_callout: StatCallout,
  contact: Contact,
};

export const renderSections = (sections) =>
  sections?.map((section, index) => {
    const Section = SECTION_COMPONENTS[section.type];
    return Section ? <Section key={index} {...section} /> : null;
  });

/* Render plain text with blank-line separation as paragraphs. */
export const paragraphs = (value) => {
  if (typeof value !== "string") {
    return value;
  }
  return value
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, index) => (
      <p key={index}>
        {block.split("\n").map((line, lineIndex, lines) => (
          <Fragment key={lineIndex}>
            {line}
            {lineIndex < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    ));
};

export const assetUrl = (url) => (url?.startsWith("/") ? url : `/${url}`);
