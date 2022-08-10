const HasSpecialCharacters  = (a_string, validationType="email", listOfChars=null) => {
    let reason = ""
    if (typeof listOfChars === "list"){
        listOfChars = listOfChars
    } else {
        var reg = new RegExp("\\\\")
        if (validationType === "email"){
            listOfChars = ["%", "#", "*", "+", "!","#","$", "%", "^", "&", "*", "(", ")", "+", "=","[", "]", "{", "}", ";", ":", `|`, `<`, `>`, reg]
        }

        if (validationType === "name"){
            listOfChars = ["_", "_", "-", "%", "#", "@", ".", "*", "+", "!","#","$", "%", "^", "&", "*", "(", ")", "+", "-", "=","[", "]", "{", "}", ";", ":", `|`, `<`, `>`, reg]
        }
    }

    for (let i=0; i<a_string.length; i++){
        let char = a_string[i]
        for (let sChar=0; sChar < listOfChars.length - 1; sChar++){
            // console.log(char, listOfChars[sChar])
            if (char == listOfChars[sChar]){
                reason = "No Special Characters Allowed"
                // console.log(reason)
                return [true, reason]
            }
            if (char.toString() === listOfChars[sChar].toString()){
                // console.log(char, listOfChars[sChar])
                reason = "No Special Characters Allowed."
                // console.log(reason)
                return [true, reason]
            }
        }
    }
    // console.log("At End OF HAS SC FUNC")
    return [false, null]


}

export default HasSpecialCharacters