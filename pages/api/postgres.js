import QUERY from "../../Merkurial/SQL/QUERY";

const handleLogin = async (req, res) => {
  const { method } = req
  const { query, type } = req.body

  const defaultReturnData = {
    ok: false, status: 500, err: "Problem Handling Query", message: "Something Went Wrong", data: null
  }
  if (!query){
    console.log("QUERY: ", query)
    return res.json({ok: false, status: 200, err: `Query Was ${query}`, message: false, data: null})
  }
  

  if (type === "GET"){
    const r = await QUERY(query)
    
    if (!r.ok){
      // console.log("GET RESPONSE: ", r)
      return res.send({...r, ok: false})
    }
    return res.json({...r, ok: true})
  } else if (method === "POST"){
    const r = await QUERY(query)
    if (!r.ok){
      // console.log("POST RESPONSE: ", r)
      return res.send({...r, ok: false})
    }
    return res.json({...r, ok: true})
  } else if (method === "PUT") {
    const r = await QUERY(query)
    if (!r.ok){
      // console.log("PUT RESPONSE: ", r)
      return res.send({...r, ok: false})
    }
    return res.json({...r, ok: true}) 
  } else if (method === "DELETE"){
    const r = await QUERY(query)
    if (!r.ok){
      // console.log("DELETE RESPONSE: ", r)
      return res.send({...r, ok: false})
    }
    return res.json({...r, ok: true})
  }
}; 
export default handleLogin;