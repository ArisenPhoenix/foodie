import { ObjectId } from "mongodb";
export const EmptyMenu = {
  breakfast: {
    meal: "breakfast",
    entrees: [],
    sides: [],
  },

  lunch: {
    meal: "lunch",
    entrees: [],
    sides: [],
  },

  dinner: {
    meal: "dinner",
    entrees: [],
    sides: [],
  },

  snack: {
    meal: "snack",
    entrees: [],
    sides: [],
  },

  dessert: {
    meal: "dessert",
    entrees: [],
    sides: [],
  },
};

export const WeeklySchedule = {
  _id: ObjectId(Math.random() / Math.random() / Math.random()),
  meal: { main: [], other: [] },
  ingredients: { main: [], other: [] },
};

export const Ingredients = {
  _id: ObjectId(Math.random() / Math.random() / Math.random()),
  ingredients: [],
};
