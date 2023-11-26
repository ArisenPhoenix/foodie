const PPRINT = (query) => {
  const queryArray = query.split(",");
  for (let i = 0; i < queryArray.length; i++) {
    if (i === queryArray.length - 1) {
      console.log(queryArray[i]);
    } else {
      console.log(queryArray[i] + ",");
    }
  }
};

export const doctor = () => {
  const text = `
      CREATE TABLE doctor (
        doctor_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(200) NOT NULL,
        specialty VARCHAR(50),
        phone_number VARCHAR(30) NOT NULL,
        line VARCHAR(50),
        home_coordinates VARCHAR(500),
        city VARCHAR(50) NOT NULL,
        district VARCHAR(50) NOT NULL,
        sub_district VARCHAR(50) NOT NULL,
        house_num VARCHAR(15),
        moo SMALLINT NOT NULL,
        birth_date VARCHAR(50) NOT NULL,
        sex VARCHAR(1) NOT NULL,
        age SMALLINT NOT NULL,
        hourly_wage SMALLINT NOT NULL,
        hours_this_month SMALLINT NOT NULL,
        hours_worked SMALLINT,
        working_hour_calls SMALLINT,
        on_call_calls SMALLINT,
        hired_date VARCHAR(50) NOT NULL,
        start_date VARCHAR(50)
        );`;
  return text;
};

export default PPRINT;
