// import css from "./IngredientTable.module.css";
// import { Fragment } from "react";
// // import IngredientsDisplay from "../../../AddMenuItemForms/AddIngredients/FormIngredient/IngredientsDisplay";
// import { TitleFy } from "../../../../Merkurial/Helpers/Links/Linkify";

// const IngredientTable = (props) => {
//   console.log("IngredientTable Props: ", props)
//   const deleter = (index) => {
//     props.delete(index);
//   };
//   return (
//     <Fragment>
//       {props.chosenIngredients.length > 0 ? (
//         <div className={css.ingredientsDiv}>
//           <table className={css.table}>
//             <tbody className={css.tbody}>
//               <tr key="Ingredient Price Header">
//                 {Object.keys(props.chosenIngredients[0]).map((keyName, index) => {
//                   return (<>
//                   { !keyName.includes("id")  && <th className={css.th}>{TitleFy(keyName)}</th>}
//                   </>)
//                 })}
//               </tr>
//               {props.chosenIngredients.map((chosenIngredient, index) => {
//                 return (
//                   <IngredientsDisplay
//                     onClick={deleter}
//                     index={index}
//                     key={`${chosenIngredient.iid} | ${index}`}
//                     id={chosenIngredient.iid}
//                     line={index + 1}
//                     price={chosenIngredient.price}
//                     number={chosenIngredient.number}
//                     ingredient={chosenIngredient.ingredient}
//                     // total
//                     hide={true}
//                   />
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : null}
//     </Fragment>
//   );
// };

// export default IngredientTable;
