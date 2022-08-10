const ConsoleLogger = (a_value = Number || String, statement = Function || String, log=false, reverse=false) => {
    if (a_value === ""){
        return console.log("A value must be a number or the data passed to a function")
    }

    const listOfBools = []

    let limit = typeof a_value === "string" ? a_value.length -1 : a_value
    if (reverse){
        console.log(`Reverse: ${reverse} Loop`)
        for (let i = limit; i > 0; i--){
            if (typeof statement === "string"){
                if (log){
                    console.log(statement)
                }
            }
            if (typeof statement === "function"){
                const a_bool = statement(a_value[i])
                listOfBools.push(a_bool)
                if (log){
                    console.log(a_bool)
                }
            }
        }
    }   
    
    if (!reverse){
        console.log(`Reverse: ${reverse} Loop`)
        for (let i = 0; i < limit; i++){
            if (typeof statement === "string"){
                if (log){
                    console.log(statement)
                }
            }
            if (typeof statement === "function"){
                if (log){
                    listOfBools.push("hi")
                    console.log(statement)
                }
            }
            if (typeof statement === "function"){
                console.log("statement is a function")
                if (log){
                    console.log(a_value)
                } else {
                    statement(a_value)
                }
            }
        }
    }

    if(!log && typeof statement !== "function"){
        console.log("list of bools below")
        listOfBools.forEach((bool) => {
            console.log(bool)
            if (!bool) return false, listOfBools
        })
    }   
    return true, [listOfBools] 
    
    
}

export default ConsoleLogger