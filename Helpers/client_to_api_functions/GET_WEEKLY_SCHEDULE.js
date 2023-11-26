const GET_WEEKLY_SCHEDULE = async () => {
    try {
      const retreival = await fetch("/api/get_weekly_schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // console.log("finished with server");
      const sendData = await retreival.json();
      // console.log("GET_WEEKLY_SCHEDULE: sendData");
      // console.log(sendData);
      return sendData;
    } catch (err) {
      console.log("There was an error retreiving the weekly schedule data");
      console.log(err);
      return err;
    }
  };
  
  export default GET_WEEKLY_SCHEDULE;