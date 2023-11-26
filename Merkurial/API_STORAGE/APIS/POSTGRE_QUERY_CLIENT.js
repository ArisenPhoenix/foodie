import { Client } from "pg";

export const HANDLE_QUERY = async (query) => {
  try {
    const response = await QUERY(query);
    if (!response.ok) {
      return { err: { ...response } };
    }
    return response;
  } catch (err) {
    return { err: err, ok: false };
  }
};

const QUERY = async (query) => {
  const client = new Client(process.env.PSQL_URI);
  try {
    await client.connect(); // gets connection
    const response = await client.query(query); // sends queries
    return { ok: true, response: response };
  } catch (err) {
    console.log("ERROR IN QUERY FUNCTION ==================================");
    console.error(err.stack);
    err.detail && console.error(err.detail);
    return { ok: false, err: err };
  } finally {
    await client.end();
  }
};

export default QUERY;
