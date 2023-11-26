const BasicFormHandler = (event, object) => {
    const {name, id, value} = event.target
    const action = object[name] ? object[name] : object[id] ? object[id] : false
    if (action){

        const setter = action.setState
        if (setter){
            const limit = action.limit
            if (limit){
                const newVal = value[limit-1]
                if (newVal){
                    setter(value[limit-1])
                }
                
            } else {
                setter(value)
            }
        }
        
    }
}

export default BasicFormHandler