<h1 style="text-align:center;"> Foodie Web App

## Test Account info:

### Email: test@test.com

### Password: testing-foodie

# Using Foodie:

    If you would like to see an empty account you may signup for an account using fake credentials it only checks that your email follows a normal email pattern and that your password >= 6 chars

# Settings:

    -- MOST SETTINGS ARE USELESS AND ARE FILLERS IN CASE I WANT TO ADD MY FINANCIAL PLANNER IN IT OR OTHERS...
    -- OPTIONAL MEALS IN THIS CASE ARE: [SNACK, DESSERT]
    -- MAIN MEALS: [BREAKFAST, LUNCH, DINNER]
    -- CURRENCY DATA MAY BE CHANGED TO FIT WHATEVER YOUR LOCAL CURRENCY IS, IT TAKES A STRING SO TECHNICALLY YOU COULD PUT A SMILY FACE IF YOU'RE FEELING FUNNY. ALSO: THIS CURRENCY IS PUT BEFORE ALL PRICE INFO SO CONSIDER YOURSELF IF YOU WANT TO PUT SOMETHING DUMB.

    You may change any of the settings in the settings section upon logging in but do know  that the only settings of real import ARE the MAIN MEALS & OPTIONAL MEALS; if you go grocery shopping every fortnight then update the number to 14 in there so it will select 3 meals for each day \* 14 days and will give you a shopping list that reflects that. If you want the settings to be saved across logins then you will need to press the "Save Changes" button.

# Adding A New Ingredient:

    -- I HIGHLY RECOMMEND GOING SHOPPING AND GETTING A RECEIPT FIRST, MAKES THE PROCESS VERY PAINLESS

    The first thing you must do to make Foodie work is add an ingredient and the price of the ingredient PER USE. So if it's a packaged item and you use it 7 times before it's gone then just divide the total price by 7. It is done this way to allow for items to be added up later and to allow for an accuracy for each dish being generated in the schedule.

# Adding A New Dish:

    You must fill in every box in the form except for instructions.
    You must first have ingredients added in order to add a meal as it uses the ingredients
    to give you options. Therefore, no ingredients, no dish, and no working app.

# Deploying Your Own App BELOW:

    Just Grab Your Own MongoDB DataBase And Firebase Account and fill in the following envs appropriately:

# ENVS

    [
    <!-- THE FIRST 5 HAVE BEEN DEPRECATED SINCE ADDING SIGNUP FUNCTIONALITY, BASICALLY JUST TEST COLLECTIONS BEFORE PUTTING IT ALL TOGETHER, I'M ADDING THEM JUST IN CASE YOU ARE CONFUSED WHILE LOOKING AT THE CODE BASE. -->

    <!-- THE WEEKLY_LIST COLLECTION NAME, THIS ONE IS DEPRECATED AND NOT NECESSARY -->
    # FOODIE_WEEKLY_LIST:

    <!-- THE fULL MENU COLLECTION NAME, THIS ONE IS DEPRECATED AND NOT NECESSARY -->
    # FOODIE_FULL_MENU:

    <!-- THE WEEKLY_LIST INGREDIENTS, THIS ONE IS DEPRECATED AND NOT NECESSARY -->
    # FOODIE_INGREDIENTS:

    <!-- THIS ONE IS THE DATA BASE NAME -->
    # FOODIE_MONGO_DB_NAME:

    <!-- THE COLLECTION OF USERS NAME -->
    # FOODIE_MONGO_USERS:
    ]

    <!-- MONGO DB URI -->
    # FOODIE_URI:

    <!-- THESE ARE THE FIREBASE KEYS NEEDED -->
    <!-- SIGNUP WILL TAKE  -->
    # FOODIE_SIGNUP_URI: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[YOUR FIREBASE KEY]

    # FOODIE_LOGIN_URI:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[YOUR FIREBASE KEY]"

    # RETURN_TYPE: "send",

# After putting the envs in via the vercel app, not putting them in there makes it fickle, I recommend putting them directly into the site, you should be able to push to gitHub and connect it to vercel and all "should" go swimmingly.

# FINE PRINT:

## This is definitely not a final product per my vision of what i could do with it but it is usable and technically doesn't require more.

## There will probably be functionality updates to it or perhaps if i feel like doing more refactoring I might make a wrapper function for the apis because that's a lot of WET REWRITTEN AND TIRED code in there. I made a MONGO MODULE FUNCTION for solving this but it doesn't take care of the try{}catch{} statements or the other stuff that's just reused....

## All

## Thank You
