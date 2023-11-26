export const LOGGER = (text) => {
  const canLog =
    process.env.NEXT_PUBLIC_IS_DEV === "true" || process.env.IS_DEV === "True";
  if (canLog) {
    console.log(text);
  } else return null;
};
