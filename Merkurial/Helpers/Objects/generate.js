export const ObjectKeyGenerator = (obj = {}, list_of_keys = []) => {
    // Pulls Data from a specific location
    const new_obj = {};
    for (let i = 0; i < list_of_keys.length; i++) {
      const key = list_of_keys[i];
      obj[key] = i;
    }
    // console.log(new_obj);
    return new_obj;
  };