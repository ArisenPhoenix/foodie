import { resolve_num, longDecimalFix } from "../GeneralPurpose/Numbers";

export const formatIngredients = (ingredients, om) => {
  //   om stands for object map
  ingredients.filter((numberObj, ingredient) => {
    const price = resolve_num(numberObj[om[1]]);
    const number = resolve_num(numberObj[om[2]]);
    const totalPrice = number * price;

    if (resolve_num(numberObj[om[3]], true)) {
      return null;
    }
    return (
      (numberObj[om[4]] = totalPrice), (numberObj[om[1]] = +numberObj[om[1]])
    );
  }, {});
  return ingredients;
};

export const reduceNums = (ingredients, om, cb, start = 0) => {
  //   om stands for object map
  const send = ingredients
    ? ingredients.reduce((total, iPrice) => {
        const price = resolve_num(iPrice[om[1]]);
        const num = resolve_num(iPrice[om[2]]);
        return cb(total, num, price);
      }, start)
    : 0;
  return send;
};

export const grandTotaler = (ingredients, om) => {
  //   om stands for object map
  const cb = (total, num, price) => {
    return total + longDecimalFix(price) * num;
  };
  return longDecimalFix(reduceNums(ingredients, om, cb), 2);
};

export const numberTallier = (ingredients, om) => {
  //   om stands for object map

  const cb = (total, num, price) => {
    return total + num;
  };
  return longDecimalFix(reduceNums(ingredients, om, cb), 2);
};
