import { useContext, useEffect, useState, createContext } from "react";
import useSqlTable, {UseSqlTable } from "../Merkurial/hooks/useSqlTable";
import {Options} from "../Merkurial/SQL/OBJECT_CLASS/SQL_TYPES.ts"
import React from "react";
import {
  RETREIVE_FROM_LOCAL_STORAGE,
  SAVE_TO_LOCAL_STORAGE,
} from "Merkurial/API_STORAGE/STORAGE/HANDLE_STORAGE";
import USER_CONTEXT from "../Merkurial/store/Context/USER_CONTEXT/user_context";
import {
  mealSchema,
  ingredientSchema,
  fullMenuSchema,
  measurementsSchema
} from "merkurialSchemas";

const call_address = "/api/postgres";
const method = "GET";
const messenger = null

import { Connections, TABLE_INFO, Action } from "./connections_helpers.tsx";

const FOOD_CONTEXT_CONNECTIONS_CONTEXT = createContext<Connections | null > (null)

export default FOOD_CONTEXT_CONNECTIONS_CONTEXT;

const mealOptoins: Options = {groupBy: false, orderBy: "meal", limit: false}

export const FOOD_CONTEXT_CONNECTIONS_CONTEXT_PROVIDER = (props) => {
  const userCtx = useContext(USER_CONTEXT);
  const userid = userCtx.userData.userid;


  const foodieSaveLocation = `foodie_${userid}`;
  const [connectionsAreOpen, setConnectionsAreOpen] = useState(userid !== null && userid ? true : false);
  const [noDataFor, setNoDataFor] = useState([]);

  const MEALS_TABLE: UseSqlTable = useSqlTable(
    "meals",
    mealSchema,
    call_address,
    method,
    connectionsAreOpen,
    messenger,
    mealOptoins
  ); 

  const INGREDIENTS_TABLE: UseSqlTable = useSqlTable(
    "ingredients",
    ingredientSchema,
    call_address,
    method,
    connectionsAreOpen,
    messenger
  );
  const MENU_TABLE: UseSqlTable = useSqlTable(
    "full_menu",
    fullMenuSchema,
    call_address,
    method,
    connectionsAreOpen,
    messenger
  );

  const MEASUREMENTS_TABLE = useSqlTable(
    "measurements",
    measurementsSchema,
    call_address,
    method,
    connectionsAreOpen,
    messenger 
  );


  const INFO_ARRAY: TABLE_INFO[] = [
    { table: INGREDIENTS_TABLE },
    { table: MEALS_TABLE },
    { table: MENU_TABLE },
  ];


  const OPEN_UP_CONNECTIONS = (open = false) => {
    for (let data of INFO_ARRAY) {
      const TABLE = data.table;
      if (TABLE) {
        TABLE.setIsActive(open);
      } else {
        console.log("Cant Open Connections For Table");
      }
    }
  };

  const TABLE_ACTIVE_ARRAY = [
    MEALS_TABLE.isActive, INGREDIENTS_TABLE.isActive, MEALS_TABLE.isActive
  ]


  useEffect(() => {
    if (userid) {
      setConnectionsAreOpen(true);
    }
  }, [setConnectionsAreOpen, userid]);

  useEffect(() => {
    if (userid && connectionsAreOpen) {
      OPEN_UP_CONNECTIONS(connectionsAreOpen);
    }
  }, [connectionsAreOpen, userid, OPEN_UP_CONNECTIONS]);



  const getAllByUserId = (
    table: UseSqlTable,
    userid: number | Number
  ) => {
    table.SELECT_ALL_BY_FOREIGN_KEY({uid: userid})
    return false;
  };


  const RETREIVE_FROM_DB = async () => {
    for (let data of INFO_ARRAY) {
      const { table: USE_SQL_TABLE } = data;
      const {TABLE_DATA, TABLE: {tableName: TABLE_NAME }, isActive } = USE_SQL_TABLE

      if (isActive) {
        const success = getAllByUserId(USE_SQL_TABLE, userid);
        if (!success) {
          if (!noDataFor.includes(TABLE_NAME)) {
            setNoDataFor((prev) => {
              const newData = new Array(...new Set([...prev, TABLE_NAME]));
              return newData;
            });
          } 
        }
      } 
      else {
          if (noDataFor.includes(TABLE_NAME)) {
            setNoDataFor((prev) => {
              const i = prev.indexOf(TABLE_NAME);
              prev.splice(i, 0);
              return [...prev];
            });
          }
      }
    }
    MEASUREMENTS_TABLE.SELECT_ALL_BY_FOREIGN_KEY({uid: 0})
  };


  const RETREIVE_FROM_STORAGE = () => {
    let localFoodObject = RETREIVE_FROM_LOCAL_STORAGE(foodieSaveLocation);
    console.log("LOCAL FOOD OBJECT: ", localFoodObject);
    if (localFoodObject === null) {
      localFoodObject = {};
    }
    if (localFoodObject !== null) {
      console.log("LOCAL FOOD OBJECT: ", localFoodObject);
      if (
        typeof localFoodObject === "object" &&
        !Array.isArray(localFoodObject)
      ) {
        for (let data of INFO_ARRAY) {
          const { table: USE_SQL_TABLE } = data;
          if (USE_SQL_TABLE) {
            const {
              TABLE: { tableName: TABLE_NAME },
              TABLE_DATA,
            } = USE_SQL_TABLE;
            const RETREIVED_TABLE_DATA = localFoodObject[TABLE_NAME];

            if (
              Array.isArray(RETREIVED_TABLE_DATA) &&
              RETREIVED_TABLE_DATA.length > 0
            ) {
              // TODO
              // SET_SQL_TABLE_DATA(RETREIVED_TABLE_DATA);
            } else {
              if (TABLE_DATA.length > 0) {
                localFoodObject[TABLE_NAME] = TABLE_DATA;
                if (noDataFor.includes(TABLE_NAME)) {
                  setNoDataFor((prev) => {
                    const i = prev.indexOf(TABLE_NAME);
                    prev.splice(i, 0);
                    return [...prev];
                  });
                } 
                else if (!noDataFor.includes(TABLE_NAME)) {
                  setNoDataFor((prev) => {
                    const newData = new Array(
                      ...new Set([...prev, TABLE_NAME])
                    );
                    return newData;
                  });
                }
              }
            }
          }
        }
      }
    }
    SAVE_TO_LOCAL_STORAGE(localFoodObject, foodieSaveLocation);
  };


  const CONTEXT_VALUE = {
    tables: {
      MEALS_TABLE: MEALS_TABLE,
      INGREDIENTS_TABLE: INGREDIENTS_TABLE,
      MENU_TABLE: MENU_TABLE,
    },

    items: {
      allMeals: MEALS_TABLE.TABLE_DATA,
      allIngredients: INGREDIENTS_TABLE.TABLE_DATA,
      menu: MENU_TABLE.TABLE_DATA,
      allMeasurements: MEASUREMENTS_TABLE.TABLE_DATA
    },

    flow: {
      connectionsAreOpen: connectionsAreOpen,
      setConnectionsAreOpen: setConnectionsAreOpen,
      OPEN_UP_CONNECTIONS: OPEN_UP_CONNECTIONS,
      RETREIVE_FROM_DB: RETREIVE_FROM_DB,
      TABLE_ACTIVE_ARRAY: TABLE_ACTIVE_ARRAY,
    },

  };

  return (
    <FOOD_CONTEXT_CONNECTIONS_CONTEXT.Provider value={CONTEXT_VALUE}>
      {props.children}
    </FOOD_CONTEXT_CONNECTIONS_CONTEXT.Provider>
  );
};
