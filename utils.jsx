import { Fragment } from 'react';
import { Hero } from './components/Hero';
import { RollingHills } from './components/RollingHills';
import { HorizontalScroll } from './components/HorizontalScroll';

export const processString = (value) => {
  if (typeof value !== 'string' || value.indexOf("\n") < 0) {
    return value;
  }

  const newValue = value.split("\n").map((el, index) => <Fragment key={index}>{el}<br /></Fragment>);
  return newValue;

}

export const renderSections = (sections) => {
  const items = sections?.map((section, index) => {
    if (section.type === 'hero') {
      return <Hero key={index} {...section} />
    }
    if (section.type === 'rolling_hills') {
      return <RollingHills key={index} {...section} />
    }
    if (section.type === 'horizontal_scroll') {
      return <HorizontalScroll key={index} {...section} />
    }
    return null;
  })
  return items;
}

export const processAssetUrl = (url) => `/${url}`;
export const getCssUrl = (url) => `url(/${url})`;
