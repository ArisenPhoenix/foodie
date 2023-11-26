import ax from "axios";

const SEND_EMAIL = async (data) => {
  return await ax
    .post("/api/send_email", data)
    .then((res) => {
      return { response: res };
    })
    .catch((err) => {
      return { err: err };
    });
};

export default SEND_EMAIL;
