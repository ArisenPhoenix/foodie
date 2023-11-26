
const FETCH = async (api_route, method, body, functionThatCalled) => {
  const m = method.toUpperCase();
  const b = body ? body : null;
  try {
    const response = await fetch(api_route, {
      method: m.toUpperCase(),
      headers: {
        "Content-Type": "application/json",
      },
      body: m === "GET" ? null : JSON.stringify(b),
    });
    try {
      return response.json()
    } catch {
      return response
    }
    
  } catch (err) {
    console.log(
      functionThatCalled
        ? `ERROR IN FETCH CATCH | Called By: ${functionThatCalled}`
        : "ERROR: ",
      err
    );
    return { err: err, ok: false, message: "FETCHING Error" };
  }
};

export default FETCH;
 