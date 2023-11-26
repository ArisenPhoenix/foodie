const MENU_SETUP = async (data) => {
    const enteredData = JSON.stringify(data);
    // const enteredData = data;
    try {
      await fetch("/api/create_new_user_db", {
        method: "POST",
        body: enteredData,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {
      console.log("There was an error posting data to the server...");
    }
  };
  
  export default MENU_SETUP;