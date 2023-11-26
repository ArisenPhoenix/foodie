const DE_LINKIFY = (link) => {
  if (!link || link === "/") {
    return;
  }
  const text = link.slice(1, link.length);
  let a = text[0];
  const b = text.slice(1, text.lenght);
  a = a.toUpperCase();
  const c = a + b;
  return c;
};

export default DE_LINKIFY;
