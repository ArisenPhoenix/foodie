import ALL_CSS from "../CSS-CONTEXT-FILES";
import { createContext } from "react";

export const ThemeContextProvider = (props) => {
  const contextValue = {};
  return (
    <ThemeContext.Provider value={contextValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};
// Need to put each theme inside of a page type
const ThemeContext = createContext({
  // Themes
  light: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  dark: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  custom: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  cosmic: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  trippy: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  serene: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  organic: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  assertive: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  aggressive: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  passive: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  passiveAggressive: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  //   Pages
  sales: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  blogs: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  news: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  streaming: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  comments: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  static: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  gallery: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  portfolio: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  about: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  profile: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  messages: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  discussions: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  article: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  articles: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  finance: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  landingPage: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  events: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
  mediaCritique: {
    buttons: {},
    cards: {},
    images: {},
    carousels: { sliding: {}, nonSliding: {} },
    text: { mono: {}, dipthongs: {}, tripthongs: {} },
  },
});

export default ThemeContext;
