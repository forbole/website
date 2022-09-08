import styled from '@emotion/styled';
import { ThemeOptions } from '@mui/material/styles';

type ContentProps = {
  theme: ThemeOptions;
};

export const MobileCSS = styled.div<any>`
  @media only screen and (min-width: 1024px) {
    display: none;
  }
`;

export const LaptopCSS = styled.div<any>`
  @media only screen and (max-width: 1024px) {
    display: none;
  }
  @media only screen and (min-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ButtonCSS = styled.button<any>`
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 8px;
  background-color: #4d2fc2;
  border-radius: 160px;
  border: none;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.036em;
  button:hover {
    background-color: #4d2fc2;
  }
`;

export const ContentCSS = styled.div<ContentProps>`
  overflow: auto;
  word-break: break-word;
  width: 80%;
  margin: auto;
  color: ${(props) =>
    props?.theme?.palette?.mode === 'dark' ? '#FFFFFF' : '#000000'};
  a {
    color: ${(props) =>
      props?.theme?.palette?.mode === 'dark'
        ? '#FFFFFF'
        : props?.theme?.palette?.custom?.forbole?.red};
    transition: 0.3s;
    &:hover {
      color: rgba(0, 0, 0, 0.87);
    }
  }
`;

export const ContentBox = styled.div<any>`
  /* Content grid
/* ---------------------------------------------------------- */

  .gh-canvas {
    display: grid;
    grid-template-columns:
      [full-start]
      minmax(calc(calc(100% - 1200px) / 2), 1fr)
      [wide-start]
      auto
      [main-start]
      720px
      [main-end]
      auto
      [wide-end]
      minmax(calc(calc(100% - 1200px) / 2), 1fr)
      [full-end];
  }

  @media (max-width: 1296px) {
    .gh-canvas {
      grid-template-columns:
        [full-start]
        4vmin
        [wide-start]
        auto
        [main-start]
        720px
        [main-end]
        auto
        [wide-end]
        4vmin
        [full-end];
    }
  }

  @media (max-width: 778px) {
    .gh-canvas {
      grid-template-columns:
        [full-start]
        4vmin
        [wide-start]
        0
        [main-start]
        auto
        [main-end]
        0
        [wide-end]
        4vmin
        [full-end];
    }
  }

  .gh-canvas > * {
    grid-column: main-start / main-end;
  }

  .kg-width-wide {
    grid-column: wide-start / wide-end;
  }

  .kg-width-full {
    grid-column: full-start / full-end;
  }

  .kg-width-full img {
    width: 100%;
  }

  /* Content & Typography
/* ---------------------------------------------------------- */

  > * + * {
    margin-top: 1.5rem;
  }

  [id]:not(:first-of-type) {
    margin: 1.5em 0 0;
  }

  > [id] + * {
    margin-top: 2vmin;
  }

  [id] + .kg-card,
  blockquote + .kg-card {
    margin-top: 6vmin;
  }

  .gh-canvas > blockquote,
  .gh-canvas > ol,
  .gh-canvas > ul,
  .gh-canvas > dl,
  .gh-canvas > p {
    font-family: var(--font-serif);
    font-weight: 400;
    font-size: 2rem;
    line-height: 1.6em;
  }

  > ul,
  > ol,
  > dl {
    padding-left: 1.9em;
  }

  hr {
    margin-top: 6vmin;
    border: 1px solid;
    border-color: rgba(247, 247, 247, 1);
  }

  hr + * {
    margin-top: 6vmin !important;
  }

  blockquote {
    position: relative;
    font-style: italic;
  }

  blockquote::before {
    content: '';
    position: absolute;
    left: -1.5em;
    top: 0;
    bottom: 0;
    width: 0.3rem;
    background: var(--color-primary);
  }

  @media (max-width: 650px) {
    .gh-canvas blockquote,
    .gh-canvas ol,
    .gh-canvas ul,
    .gh-canvas dl,
    .gh-canvas p {
      font-size: 1.8rem;
    }

    blockquote::before {
      left: -4vmin;
    }
  }

  /* Cards
/* ---------------------------------------------------------- */

  :not(.kg-card):not([id]) + .kg-card {
    margin-top: 6vmin;
  }

  .kg-card + :not(.kg-card) {
    margin-top: 6vmin;
  }

  .kg-card figcaption {
    padding: 0.6rem 1.5rem 0;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 300;
    font-size: 0.9rem;
    line-height: 1.4em;
  }

  .kg-card figcaption strong {
    color: rgba(0, 0, 0, 0.8);
  }

  code {
    vertical-align: middle;
    padding: 0.15em 0.4em 0.15em;
    border: #e1eaef 1px solid;
    font-weight: 400 !important;
    font-size: 0.9em;
    line-height: 1em;
    color: #dc0050;
    background: #f0f6f9;
    border-radius: 0.25em;
  }

  pre {
    overflow: auto;
    padding: 16px 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.4);
  }

  .kg-embed-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .kg-image-card img {
    margin: auto;
  }

  /* Galleries
/* ---------------------------------------------------------- */

  .kg-gallery-card + .kg-gallery-card {
    margin-top: 0.75em;
  }

  .kg-gallery-container {
    position: relative;
  }

  .kg-gallery-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .kg-gallery-image img {
    display: block;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  .kg-gallery-row:not(:first-of-type) {
    margin: 0.75em 0 0 0;
  }

  .kg-gallery-image:not(:first-of-type) {
    margin: 0 0 0 0.75em;
  }

  /* Bookmark Cards
/* ---------------------------------------------------------- */

  .kg-bookmark-card,
  .kg-bookmark-publisher {
    position: relative;
  }

  .kg-bookmark-container,
  .kg-bookmark-container:hover {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row-reverse;
    color: currentColor;
    background: rgba(255, 255, 255, 0.6);
    font-family: var(--font-sans-serif);
    text-decoration: none;
    border-radius: 5px;
    box-shadow: 0 2px 6px -2px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.4);
    overflow: hidden;
  }

  .kg-bookmark-content {
    flex-basis: 0;
    flex-grow: 999;
    padding: 20px;
    order: 1;
  }

  .kg-bookmark-title {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.3em;
  }

  .kg-bookmark-description {
    display: -webkit-box;
    max-height: 45px;
    margin: 0.5em 0 0 0;
    font-size: 1.4rem;
    line-height: 1.55em;
    overflow: hidden;
    opacity: 0.8;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .kg-bookmark-metadata {
    margin-top: 20px;
  }

  .kg-bookmark-metadata {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 1.3em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .kg-bookmark-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .kg-bookmark-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
  }

  .kg-bookmark-thumbnail {
    display: flex;
    flex-basis: 24rem;
    flex-grow: 1;
    justify-content: flex-end;
  }

  .kg-bookmark-thumbnail img {
    max-width: 100%;
    height: auto;
    vertical-align: bottom;
    object-fit: cover;
  }

  .kg-bookmark-author {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .kg-bookmark-publisher::before {
    content: '•';
    margin: 0 0.5em;
  }

  /* Card captions
/* ---------------------------------------------------------- */

  .kg-width-full.kg-card-hascaption {
    display: grid;
    grid-template-columns: inherit;
  }

  .kg-width-wide.kg-card-hascaption img {
    grid-column: wide-start / wide-end;
  }
  .kg-width-full.kg-card-hascaption img {
    grid-column: 1 / -1;
  }

  .kg-width-full.kg-card-hascaption figcaption {
    grid-column: main-start / main-end;
  }

  /* Tables
/* ---------------------------------------------------------- */

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    padding: 0.5em 0.8em;
    text-align: left;
    font-size: 0.75em;
    text-transform: uppercase;
  }

  td {
    padding: 0.4em 0.7em;
  }

  tbody tr:nth-of-type(2n + 1) {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 1px;
  }

  tbody tr:nth-of-type(2n + 2) td:last-child {
    box-shadow: inset 1px 0 rgba(0, 0, 0, 0.1), inset -1px 0 rgba(0, 0, 0, 0.1);
  }

  tbody tr:nth-of-type(2n + 2) td {
    box-shadow: inset 1px 0 rgba(0, 0, 0, 0.1);
  }

  tbody tr:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;
