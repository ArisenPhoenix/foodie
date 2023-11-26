export const SAVE_TO_LOCAL_STORAGE = (data, itemName) => {
  let finalData;

  try {
    if (Array.isArray(data)) {
      finalData = JSON.stringify({ array: data });
    } else {
      finalData = JSON.stringify(data);
    }
  } catch (err) {
    console.error(
      "There was an error stringifying the data to save to local storage",
      err
    );
    return false;
  }
  if (finalData) {
    localStorage.setItem(itemName, finalData);
    return true;
  } else {
    return false;
  }
};

export const RETREIVE_FROM_LOCAL_STORAGE = (itemName) => {
  try {
    const storedData = localStorage.getItem(itemName);
    const data = JSON.parse(storedData);
    return data?.array ? data.array : data;
  } catch (err) {
    return null;
  }
};

export const REMOVE_FROM_LOCAL_STORAGE = (itemName) => {
  try {
    localStorage.removeItem(itemName);
  } catch (err) {
    console.error(
      `there was a problem removing ${itemName} from local storage.`,
      err
    );
  }
};


export const UPDATE_LOCAL_STORAGE = (data, itemName) => {
  REMOVE_FROM_LOCAL_STORAGE(itemName)
  SAVE_TO_LOCAL_STORAGE(data, itemName)
}
