// "use client"

import React, { createContext, useState } from "react";
import { SAVE_TO_LOCAL_STORAGE, RETREIVE_FROM_LOCAL_STORAGE } from "../../../API_STORAGE/STORAGE/HANDLE_STORAGE";
import { useEffect } from "react";
import {leftNavs, 
    rightNavs, 
    centerNavs, 
    dropDowns, 
    navHeight, 
    navWidth, 
    mobileBorder, 
    navBorders, 
    navStyles,
    mobileWidth
} from "../../../../merkurialConfig"


const { mobile, mainBg } = navStyles
const { height: mobileNavHeight, width: mobileNavWidth } = mobile
const { bgColor} = mainBg

const NAVIGATION_CONTEXT = createContext({
    currentPage: {text: "", href: ""},
    setCurrentPage: ({text, href}) => {},
    leftNavs: [],
    rightNavs: [],
    centerNavs: [],
    dropDowns: [],
    mobileBorder: Boolean,
    navBorders: Boolean,
    navHeight: String,
    navWidth: String,
    mobileNavHeight: String,
    mobileNavWidth: String,
    backgroundColor: String,
    navStyles: navStyles,
    mobileWidth: 600
  });

export default NAVIGATION_CONTEXT


export const NAVIGATION_CONTEXT_PROVIDER = (props) => {
    const template = {text: "", href: ""}
    const [currentPage, setCurrentPageData] = useState(template)
    const [navs, _] = useState({leftNavs: leftNavs, rightNavs: rightNavs, centerNavs: centerNavs, dropDowns: dropDowns})

    const setCurrentPage = (object) => {
        SAVE_TO_LOCAL_STORAGE(object, "LastPage")
        setCurrentPageData(object)
    }

    useEffect(() => {
        if (!currentPage.text){
            const lastPage = RETREIVE_FROM_LOCAL_STORAGE("LastPage")
            lastPage && setCurrentPageData(lastPage)
        }
    }, [currentPage])

    const navigationContext = {
        currentPage: currentPage,
        setCurrentPage: setCurrentPage,
        leftNavs: navs.leftNavs,
        rightNavs: navs.rightNavs,
        centerNavs: navs.centerNavs,
        dropDowns: navs.dropDowns,
        mobileBorder: mobileBorder,
        navBorders: navBorders,
        navHeight: navHeight,
        navWidth: navWidth,
        mobileNavHeight: mobileNavHeight,
        mobileNavWidth: mobileNavWidth,
        backgroundColor: bgColor,
        navStyles: navStyles,
        mobileWidth: mobileWidth
    }

    return (
        
            <NAVIGATION_CONTEXT.Provider value={navigationContext}>
                {props.children}
            </NAVIGATION_CONTEXT.Provider>
    )
}