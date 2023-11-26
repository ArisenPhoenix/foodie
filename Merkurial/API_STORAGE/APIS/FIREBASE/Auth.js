import FETCH from "../FETCH";

const FireBaseAuth = async (endpoint, userInfo, method = "POST") => {
  userInfo.method = method;
  const r = await FETCH(endpoint, method, userInfo);
  return r;
};

export default FireBaseAuth;
