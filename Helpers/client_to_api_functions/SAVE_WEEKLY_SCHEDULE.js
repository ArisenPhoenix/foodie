const SAVE_WEEKLY_SCHEDULE = async (data) => {
    const enteredData = JSON.stringify(data);
    try {
      const final = await fetch("/api/save_schedule", {
        method: "POST",
        body: enteredData,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("finished with saving weekly menu");
      console.log(final);
    } catch (err) {
      console.log("Error: Saving Weekly Schedule Failed in Fetch.");
      console.log(err);
      return err;
    }
  };
  
  export default SAVE_WEEKLY_SCHEDULE;