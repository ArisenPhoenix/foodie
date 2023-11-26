import ARGS from "./postgreArgs";

export class Person {
  constructor(
    first_name,
    last_name,
    job,
    age,
    sex,
    email,
    password,
    specialty,
    phone_number,
    line,
    home_coordinates,
    building_number,
    moo,
    city,
    district,
    sub_district,
    hourly_wage,
    hours_this_month,
    hours_worked,
    working_hour_calls,
    extra_calls,
    hired_date,
    credentials,
    clinic_id
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.job = job;
    this.age = age;
    this.sex = sex;
    this.email = email;
    this.password = password;
    this.specialty = specialty;
    this.phone_number = phone_number;
    this.line = line;
    this.home_coordinates = home_coordinates;
    this.building_number = building_number;
    this.moo = moo;
    this.city = city;
    this.district = district;
    this.sub_district = sub_district;
    this.hourly_wage = hourly_wage;
    this.hours_this_month = hours_this_month;
    this.hours_worked = hours_worked;
    this.working_hour_calls = working_hour_calls;
    this.extra_calls = extra_calls;
    this.hired_date = hired_date;
    this.credentials = credentials;
    this.clinic_id = clinic_id;
  }
  info() {
    console.log(this);
  }
  name() {
    return this.constructor.name;
  }

  
}

export const personTableConstructor = () => {
  const {
    primaryKey,
    serial,
    varchar1,
    varchar50,
    varchar100,
    varchar200,
    varchar500,
    notNull,
    smallInt,
    unique,
    foreignKey,
  } = ARGS;

  const personObj = {
    id: [primaryKey, serial],
    first_name: [varchar100, notNull],
    last_name: [varchar100, notNull],
    job: [varchar50, notNull],
    age: [smallInt, notNull],
    sex: [varchar1, notNull],
    email: [varchar100, notNull],
    password: [varchar200, notNull],
    specialty: [varchar100, notNull],
    phone_number: [varchar50, notNull],
    line: [varchar100],
    home_coordinates: [varchar500, notNull],
    building_number: [varchar50, notNull],
    moo: [smallInt],
    city: [varchar50, notNull],
    district: [varchar50, notNull],
    sub_district: [varchar50, notNull],
    hourly_wage: [smallInt, notNull],
    hours_this_month: [smallInt],
    hours_worked: [smallInt],
    working_hour_calls: [smallInt],
    extra_calls: [smallInt],
    hired_date: [varchar50, notNull],
    credentials: [varchar100, unique, notNull],
    clinic_id: [smallInt, foreignKey],
  };

  return personObj;
};

export default personTableConstructor;

export const removeProperties = (obj, remove) => {
  if (typeof remove !== "undefined") {
    if (Array.isArray(remove)) {
      remove.forEach((item, index) => {
        obj[item] && delete obj[item];
      });
    } else {
      delete obj[remove];
    }
    delete obj[remove];
  }
  return obj;
};
