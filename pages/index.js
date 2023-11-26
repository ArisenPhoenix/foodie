import Head from "next/head";
import { useContext, useEffect } from "react";
// import BusinessContext from "../store/business-context";
import FoodContext from "../store/food-context";
import ShoppingList from "../oComponents/ShoppingList/ShoppingList";
import AUTH_GUARD from "../Merkurial/Auth/AUTH.js"
export default function Home() {
  // const busiCtx = useContext(BusinessContext);
  const foodCtx = useContext(FoodContext);
  const showMeals = false;
  const showMealType = false;

  // Classes For Meal Module & Below
  const entreeClasses = {};
  const entreeListClasses = { entree: entreeClasses };
  const sideClasses = {};
  const sideListClasses = { side: sideClasses };

  const dishClass = {};
  const headersClasses = {};

  const mealModuleClasses = {
    entrees: entreeListClasses,
    sides: sideListClasses,
    dish: dishClass,
    headers: headersClasses,
    show: { meals: showMeals, mealType: showMealType },
  };

  const realMeals = foodCtx && foodCtx.mainMeals && foodCtx.mainMeals.list;
  const realIngredients =
    foodCtx && foodCtx.mainMeals && foodCtx.mainMeals.ingredients;
  const otherMeals = foodCtx && foodCtx.otherMeals && foodCtx.otherMeals.list;
  const otherIngredients =
    foodCtx && foodCtx.otherMeals && foodCtx.otherMeals.ingredients;

  // const a_shoppingList =
  //   realIngredients &&
  //   otherIngredients &&
  //   [...realIngredients, ...otherIngredients].sort((a, b) => {
  //     var textA = a.ingredient;
  //     var textB = b.ingredient;
  //     return textA < textB ? -1 : textA > textB ? 1 : 0;
  //   });

  // useEffect(() => {

    // const newList = a_shoppingList.map((item, index, a_shoppingList) => {
    //   if (
    //     a_shoppingList &&
    //     typeof a_shoppingList[index] !== "undefined" &&
    //     typeof a_shoppingList[index + 1] !== "undefined" &&
    //     item &&
    //     typeof item.ingredient !== "undefined"
    //   ) {
    //     if (
    //       a_shoppingList[index + 1] &&
    //       a_shoppingList[index + 1].ingredient &&
    //       item.ingredient.trim() === a_shoppingList[index + 1].ingredient.trim()
    //     ) {
    //       const item1 = item;
    //       const item2 = a_shoppingList[index + 1];

    //       const totalNumber = item1.number + item2.number;
    //       const price = item.price;

    //       const newItem = {
    //         ...item,
    //         number: totalNumber,
    //         total: price * totalNumber,
    //       };
    //       a_shoppingList.splice(index, 2, newItem);
    //       return newItem;
    //     } else {
    //       return item;
    //     }
    //   }
    // });
  // }, [a_shoppingList]);

  return (
    <AUTH_GUARD needsAdmin={false} needsLoggedIn={true} needsUser={true}>
      <div>
        <Head>
          {/* <title>{busiCtx.name}</title> */}
          <meta name="description" content="Shopping List and Menu" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ShoppingList
          shoppingList={foodCtx.allIngredients}
          // realMeals={realMeals}
          // realIngredients={realIngredients}
          // otherMeals={otherMeals}
          // otherIngredients={otherIngredients}
          // menuId={foodCtx.menuId}
          // scheduleId={foodCtx.scheduleId}
          // cur={foodCtx.currency}
          // showMeals={showMeals}
          // showMealType={showMealType}
          // mealModuleClasses={mealModuleClasses}
          // getNew={foodCtx.getNew}
          // reload={foodCtx.reload}
          // setReload={foodCtx.setReload}
          // hasIngredients={foodCtx.hasScheduleIngredients}
        />
      </div>
    </AUTH_GUARD>
  );
}
