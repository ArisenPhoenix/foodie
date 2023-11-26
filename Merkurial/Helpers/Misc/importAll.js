import { useEffect, useState } from "react";

let tempAll;
export const useImportAll = (dir) => {
  const [all, setAll] = useState([]);
  useEffect(() => {
    const r = require.context(dir, false, /\.(png|jpe?g|svg)$/);
    let images = [];
    r.keys().map((item, index) => {
      const image = r(item);
      images.push(image);
    });
    setAll(images);
    tempAll = images;
    // return images;
  }, []);
  if (all) {
    return all;
  } else {
    return tempAll;
  }
};

const IMPORT_ALL = (r) => {
  let images = [];
  r.keys().map((item, index) => {
    const image = r(item);
    images.push(image);
  });
  return images;
};

export default IMPORT_ALL;
