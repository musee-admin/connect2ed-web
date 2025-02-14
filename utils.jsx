import { Fragment } from 'react';

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
      return <div></div>
    }
    return null;
  })
  return items;
}

export const processAssetUrl = (url) => `/${url}`;
