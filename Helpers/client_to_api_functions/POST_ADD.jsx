const POST_ADD = async (data) => {
  const enteredData = JSON.stringify(data);
  try {
    const final = await fetch("/api/add_new_dish", {
      method: "POST",
      body: enteredData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("finished with server");
    const sendData = await final.json();
    return sendData;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default POST_ADD;
