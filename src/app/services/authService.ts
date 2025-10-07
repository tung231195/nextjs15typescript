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

const googleService = async (googleToken: string) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`, {
      token: googleToken,
    });
    return res.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};

export { loginService, googleService };
