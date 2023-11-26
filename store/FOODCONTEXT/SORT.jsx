const SORT = (list_data, by = "") => {
  // console.log("LIST_DATA: ", list_data);
  list_data.sort((a, b) => {
    var textA = a[by];
    var textB = b[by];
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });
  console.log("LIST_DATA: ", list_data);
  return list_data;
};

export default SORT;
