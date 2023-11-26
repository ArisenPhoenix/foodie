import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { RETREIVE_FROM_LOCAL_STORAGE, SAVE_TO_LOCAL_STORAGE, REMOVE_FROM_LOCAL_STORAGE } from "../Merkurial/API_STORAGE/STORAGE/HANDLE_STORAGE";
import USER_CONTEXT from "../Merkurial/store/Context/USER_CONTEXT/user_context";


const defaultSiteData = {
  lastPageData: {},
  lastDishData: {},
  lastMealData: {}
}


const SiteContext = createContext({
  lastDish: {
    save: (currentDishData) => {},
    remove: () => {},
    get: () => {},
  },
  lastMeal: {
    save: (currentMealData) => {},
    remove: () => {},
    get: () => String,
  },
  lastPage: {
    save: (currentPageData) => {},
    remove: () => {},
    get: () => String,
  },
  isPrinting: Boolean,
  toggleIsPrinting: () => {},

  lastDishData: {},
  lastMealName: "",
  lastPagePath: "",
});

export const SiteContextProvider = (props) => {
  const router = useRouter();
  const userCtx = useContext(USER_CONTEXT)
  const [lastPageData, setLastPageData] = useState("")
  const [lastMealData, setLastMealData] = useState("")
  const [lastDishData, setLastDishData] = useState({})
  const [isHandlingStorage, setIsHandlingStorage] = useState(false)
  const userName = userCtx.userData.username





  const handleStorage = (option, key, currentInfo) => {
    switch (option) {
      case "save":
        return saveToStorage(currentInfo, key)
      
      case "get":
        return getFromStorage(key)

      case "remove":
        return removeFromStorage(key)
    
      default:
        throw Error(`Save Info ${key} Is Not A Valid Function Option`)
    }
  }
  const handleOption = (infoName, option, currentInfo = null) => {
    if (userName && typeof userName === "string"){
      switch (infoName) {
        case "lastPageData":
          return handleStorage(option, "lastPageData", currentInfo)

        case "lastMealData":
          return handleStorage(option, "lastMealData", currentInfo)

        case "lastDishData":
          return handleStorage(option, "lastDishData", currentInfo)

        default:
          throw Error(`Save Info ${infoName} Is Not A Valid Name For handle Storage Option`)
      }

    }
  }


  const saveToStorage = (currentInfo, storageLocationName) => {
    const prevData = RETREIVE_FROM_LOCAL_STORAGE(userName)
    if (storageLocationName && typeof storageLocationName === "string" && storageLocationName != null){
      if (prevData && prevData != null){
        prevData[storageLocationName] = currentInfo
        SAVE_TO_LOCAL_STORAGE(prevData)
        storageLocationName === "lastPageData" && setLastPageData(currentInfo)
        storageLocationName === "lastDishData" && setLastDishData(currentInfo)
        storageLocationName === "lastMealData" && setLastMealData(currentInfo)
      } else {
        const data = defaultSiteData
        data.lastDishData = lastDishData
        data.lastMealData = lastMealData
        data.lastPageData = lastPageData
        SAVE_TO_LOCAL_STORAGE(data, userName)
      }
      return true
    } else {
      throw Error(`Save Info ${storageLocationName} Is Not A Valid Storage Location To Save To`)
    }
  }
  const removeFromStorage = (storageLocationName) => {
    REMOVE_FROM_LOCAL_STORAGE(storageLocationName)
    storageLocationName === "lastPageData" && setLastPageData({})
    storageLocationName === "lastDishData" && setLastDishData({})
    storageLocationName === "lastMealData" && setLastMealData({})
    return true
  }

  const getFromStorage = (storageLocationName) => {
    const allData = RETREIVE_FROM_LOCAL_STORAGE(userName)
    if (allData && allData != null){
      const lastInfo = allData[storageLocationName]
      if (lastInfo){
        // storageLocationName === "lastPageData" && setLastPageData({})
        // storageLocationName === "lastDishData" && setLastDishData({})
        // storageLocationName === "lastMealData" && setLastMealData({})
        return lastInfo
      }
    }
    return false
  }


  const saveLastPage = (currentPageData) => {
    setIsHandlingStorage({
      infoName: "lastPageData",
      option: "save",
      currentInfo: currentPageData
    })
  }
  const removeLastPage = () => {
    setIsHandlingStorage({
      infoName: "lastPageData",
      option: "remove",
      currentInfo: null
    })
  }
  const getLastPage = () => {
    setIsHandlingStorage({
      infoName: "lastPageData",
      option: "get",
      currentInfo: null
    })
    return lastPageData
  }


  const saveLastMeal = (currentMealData) => {
    setIsHandlingStorage({
      infoName: "lastMealData",
      option: "save",
      currentInfo: currentMealData
    })
  }
  const removeLastMeal = () => {
    setIsHandlingStorage({
      infoName: "lastMealData",
      option: "remove",
      currentInfo: null
    })
  }
  const getLastMeal = () => {
    setIsHandlingStorage({
      infoName: "lastMealData",
      option: "get",
      currentInfo: null
    })
    return lastMealData
  }


  const saveLastDish = (currentDishData) => {
    setLastDishData(currentDishData)
    const newInfo = {
      infoName: "lastDishData",
      option: "save",
      currentInfo: currentDishData
    }

    setIsHandlingStorage(newInfo)
  }
  const removeLastDish = () => {
    setIsHandlingStorage({
      infoName: "lastDishData",
      option: "remove",
      currentInfo: null
    })
  }
  const getLastDish = () => {
    setIsHandlingStorage({
      infoName: "lastDishData",
      option: "get",
      currentInfo: null
    })
    return lastDishData
  }


  const contextValue = {
    lastPage: {
      save: saveLastPage,
      remove: removeLastPage,
      get: getLastPage,
    },
    lastMeal: {
      save: saveLastMeal,
      remove: removeLastMeal,
      get: getLastMeal,
    },
    lastDish: {
      save: saveLastDish,
      remove: removeLastDish,
      get: getLastDish,
    },

    lastPageName: lastPageData,
    lastMealName: lastMealData,
    lastDishData: lastDishData
    
  };


  useEffect(() => {
    if (isHandlingStorage){
      const {infoName, option, currentInfo} = isHandlingStorage
      if (infoName === "lastDishData" && option === "save"){
        console.log("Saving Last Dish Data In UseEffect: ", currentInfo)
      }
      handleOption(infoName, option, currentInfo)
      setIsHandlingStorage(false)
    }
  }, [isHandlingStorage])


  return (
    <SiteContext.Provider value={contextValue}>
        {props.children}
    </SiteContext.Provider>
  );
};

export default SiteContext;
