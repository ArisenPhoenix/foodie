import { Dispatch, SetStateAction, createContext } from "react";
import { UseSqlTable } from "Merkurial/hooks/useSqlTable";

export type TABLE_INFO = {
  table: UseSqlTable;
};
export type ItemsArray = Array<{}>;
export type SetBool = (bool: boolean) => void | Dispatch<SetStateAction<any[]>>;
export type Action = () => void | Promise<void> | Dispatch<SetStateAction<any[]>>;

export interface UseSqlTables {
  MEALS_TABLE: UseSqlTable;
  INGREDIENTS_TABLE: UseSqlTable;
  MENU_TABLE: UseSqlTable;
}

export interface ItemStates {
  allMeals: ItemsArray;
  allIngredients: ItemsArray;
  menu: ItemsArray;
  allMeasurements: ItemsArray;
}

export interface Flow {
  connectionsAreOpen: boolean;
  setConnectionsAreOpen: SetBool;
  OPEN_UP_CONNECTIONS: SetBool;
  // RETREIVE_ALL_DATA: Action;
  RETREIVE_FROM_DB: Action;
  TABLE_ACTIVE_ARRAY: boolean[]
  // SAVE_DATA_TO_STORAGE: Action;
}

export interface Connections {
  tables: UseSqlTables;
  items: ItemStates;
  flow: Flow;
}



export const FoodContextConnectionDefaultContext = {
    tables: {
      MEALS_TABLE: {},
      INGREDIENTS_TABLE: {},
      MENU_TABLE: {},
    },
  
    items: {
      allMeals: [],
      allIngredients: [],
      menu: [],
      allMeasurements: []
    },
    flow: {
      connectionsAreOpen: true,
      setConnectionsAreOpen: () => {},
      OPEN_UP_CONNECTIONS: (boolean: boolean) => {},
      // RETREIVE_ALL_DATA: () => {},
      SAVE_DATA_TO_STORAGE: () => {},
      RETREIVE_FROM_DB: () => {},
      TABLE_ACTIVE_ARRAY: []
    },
    INFO_ARRAY: []
  };


  export default FoodContextConnectionDefaultContext