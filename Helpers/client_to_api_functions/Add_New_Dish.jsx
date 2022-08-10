const POST_ADD = async (data) => {
  console.log("In POST_ADD");
  const enteredData = JSON.stringify(data);
  let newData;
  try {
    return await fetch("/api/add_new_dish", {
      method: "POST",
      body: enteredData,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    console.log("There was an error posting data to the server...");
  }
  console.log("newData below:");

  console.log(newData);
  console.log("Exiting POST_ADD");
  return newData;
};

export default POST_ADD;
