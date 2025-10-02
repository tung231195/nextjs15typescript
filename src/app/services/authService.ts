import axios from "axios";
import { TParamsLogin } from "../types";
const loginService = async (data: TParamsLogin) => {
  try {
    const login = await axios.post(`http://127.0.0.1:5000/api/auth/login`, data);

    return login.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
  //return login;
};

export { loginService };
