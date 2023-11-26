import bgSrc from "./public/paperBg.jpg"


export const leftNavs = [
    {href: "/menu", text: "Menu", border: false, requiresLogin: true},
]

export const centerNavs = [
    {href: "/menu/breakfast", text: "Breakfast", border: false, requiresLogin: true},
    {href: "/menu/lunch", text: "Lunch", border: false, requiresLogin: true},
    {href: "/menu/dinner", text: "Dinner", border: false, requiresLogin: true},
]

export const rightNavs = [
    {href: "/menu/snack", text: "Snack", border: false, requiresLogin: true},
    {href: "/menu/dessert", text: "Dessert", border: false, requiresLogin: true},
]

export const dropDowns = [
    {href: "/add", text: "Add Dishes", border: false, requiresLogin: true},
    {href: "/ingredients", text: "Ingredients", border: false, requiresLogin: true},
    {href: "/logout", text: "Logout", border: true, requiresLogin: true},
    {href: "/login", text: "Login", border: false, requiresLogin: false},
    {href: "/signup", text: "Signup", border: false, requiresLogin: false},
    {href: "/settings", text: "Settings", border: true, requiresLogin: true},
]


export const currentPage = {text: "Home", href: "/"}

export const mobileBorder = false
export const navBorders = false

export const navHeight = "4rem"
export const navWidth = "7rem"

export const mobileWidth = 1000


export const navStyles = {
  main: {
    width: "100%",
    height: "4rem",
    backgroundColor: "none"
  },

  mobile: {
    bgColor: "grey",
    width: "100%",
    height: "4rem"
  },

  nav: {
    bgColor: "grey",
    width: "100%",
    height: "4rem"
  },

  bottom: {
    bgColor: "black"
  },

  logo: {
    width: "5rem",
    bgColor: "black",
    alt: "Foodie"
  },

  dropDown: {
    bgColor: "tan",
    width: "5rem",
    height: "4rem"
  },

  dropDownNavItem: {
    width: "100%",
    height: "4rem"
  },

  mainBg: {
    bgSrc: bgSrc,
    bgColor: null
  },

  rightNavs: rightNavs,
  leftNavs: leftNavs,
  centerNavs: centerNavs,
  dropDowns: dropDowns,
  currentPage: currentPage,
  mobileBorder: mobileBorder,
  navBorders: navBorders
}


export const portfolioStyles = {
  grid1: {
    color: "#43505a",
    numCols: 3,
  },
  
  grid2: {
    color: "forestGreen",
    numCols: 3
  }
}



export const navStyles2 = {

    currentPage: {text: "Home", href: "/"},
    logo: {
      width: "5rem",
      height: "3.9rem",
      bgColor: "black",
    },

    rightNavs: rightNavs,
    leftNavs: leftNavs,
    centerNavs: centerNavs,
    dropDowns: dropDowns,

    navGlobal: {
      width: "100%",
      height: "4rem",
      bgColor: null,
    },
  
    mobile: {
      bgColor: "grey",
      width: "100%",
      height: "4rem",
      borders: false,
    },
  
    navMain: {
      top: {
        bgColor: "grey",
        width: "100%",
        height: "4rem",
        borders: false
      },

      canvas: {
        bgColor: "grey",
        width: "100%",
        height: "4rem",
        borders: false,
        bg: bgSrc
      },

      footer: {
        bgColor: "grey",
        width: "100%",
        height: "4rem",
        borders: false
      },

      dropDown: {
        bgColor: "tan",
        width: "5rem",
        height: "4rem",
        borders: false,
        navItem: {
          width: "100%",
          height: "4rem"
        },
      },
    },
  }


