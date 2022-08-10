export const SORT = (list_data, by = "") => {
  const new_list = list_data;
  new_list.sort((a, b) => {
    var textA = a[by];
    var textB = b[by];
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return new_list;
};

// export default SORT;

export const SORT2 = (list_data, by1 = "", by2 = "") => {
  //   console.log(list_data);
  const new_list = list_data;
  new_list.sort((a, b) => {
    let textA;
    let textB;

    textA = a[by1][by2];
    textB = b[by1][by2];

    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  return new_list;
};
