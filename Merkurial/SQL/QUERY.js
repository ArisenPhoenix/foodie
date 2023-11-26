import { Client } from "pg";

export const HANDLE_QUERY_ERROR = async (error) => {
  
  try {
    let json = JSON.parse(error);
    if (json.error || json.message) {
      return {
        ok: false,
        err: json.error
          ? json.error
          : json.message
          ? json.message
          : json.err,
        data: error,
        message: "Unknown Error",
        status: 500,
      };
    } else {
      return {
        ok: true,
        message: "I Don't Know What Happened LOLS",
        data: "I Guess No Error Here",
        status: 200
      }
    }
  } catch (jsonParseError) {
    // means error is already an object
    const msg = error.message;
    switch (true) {
      case msg.includes("already exists"):
        return { ok: true, message: "Already Exists", err: msg, status: 208 };

      case msg.includes("does not exist"):
        return { ok: false, message: "Does Not Exist", err: msg, status: 400 };

      case msg.includes("duplicate"):
        return {
          ok: true,
          message: "Unique Parameter For Table Was Defiled and Duplicated :)",
          err: msg,
          status: 208,
        };

      case msg.includes("column") && msg.includes("type"):
        return {
          ok: false,
          message: "Column Type Error",
          err: msg,
          status: 400
        }

      case msg == `'syntax error at or near "{"'`:
        return {
          ok: false,
          message: "This Error Is Most Likely Due To An SQL jsonb or SQL Array Syntax Error",
          err: msg,
          status: 400
        }

      default:
        return { ok: false, message: "Unknown Error", err: msg, status: 500 };
    }
  }
};

const QUERY = async (query) => {
  const client = new Client(process.env.PG_DB_URI);
  try {
    await client.connect();
    const response = await client.query(query); // sends queries

    client.end();
    return {
      ok: true,
      message: null,
      response: response,
      err: null,
      status: 200,
    };
  } catch (err) {
    try {
      const text = JSON.parse(err)
      console.log("ERROR: ", text)
      
    } catch (err) {
      
    }
    
    const returnData = HANDLE_QUERY_ERROR(err);
    client.end();
    return returnData;
  }
};

export default QUERY;
