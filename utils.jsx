import { Fragment } from "react";
import { Hero } from "./components/Hero";
import { RollingHills } from "./components/RollingHills";
import { HorizontalScroll } from "./components/HorizontalScroll";
import { Demo } from "./components/Demo";
import { VideoScroll } from "./components/VideoScroll";
import { StackingCards } from "./components/StackingCards";
import { TextImage } from "./components/TextImage";
import { People } from "./components/People";
import { ContactUsForm } from "./components/ContactUsForm";
import { Faqs } from "./components/Faqs";
import { DevelopmentGraph } from "./components/DevelopmentGraph";
import { EcosystemPlayers } from "./components/EcosystemPlayers";

export const processString = (value) => {
  if (typeof value !== "string" || value.indexOf("\n") < 0) {
    return value;
  }

  const newValue = value.split("\n").map((el, index) => (
    <Fragment key={index}>
      {el}
      <br />
    </Fragment>
  ));
  return newValue;
};

export const renderSections = (sections) => {
  const items = sections?.map((section, index) => {
    if (section.type === "hero") {
      return <Hero key={index} {...section} />;
    }
    if (section.type === "rolling_hills") {
      return <RollingHills key={index} {...section} />;
    }
    if (section.type === "horizontal_scroll") {
      return <HorizontalScroll key={index} {...section} />;
    }
    if (section.type === "demo") {
      return <Demo key={index} {...section} />;
    }
    if (section.type === "video_scroll") {
      return <VideoScroll key={index} {...section} />;
    }
    if (section.type === "stacking_cards") {
      return <StackingCards key={index} {...section} />;
    }
    if (section.type === "text_image") {
      return <TextImage key={index} {...section} />;
    }
    if (section.type === "people") {
      return <People key={index} {...section} />;
    }
    if (section.type === "contact_us") {
      return <ContactUsForm key={index} {...section} />;
    }
    if (section.type === "faqs") {
      return <Faqs key={index} {...section} />;
    }
    if (section.type === "development_graph") {
      return <DevelopmentGraph key={index} {...section} />;
    }
    if (section.type === "ecosystem_players") {
      return <EcosystemPlayers key={index} {...section} />;
    }
    return null;
  });
  return items;
};

export const processAssetUrl = (url) => `/${url}`;
export const getCssUrl = (url) => `url(/${url})`;
