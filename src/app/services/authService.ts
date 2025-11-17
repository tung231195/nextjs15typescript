import axios from "axios";
import { TParamsLogin } from "../types";
const loginService = async (data: TParamsLogin) => {
  try {
    const login = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, data);

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
const registerService = async (data: TParamsLogin) => {
  try {
    const user = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, data);
    return user.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
  //return login;
};
const forgotPasswordService = async (email: string) => {
  try {
    const user = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot`, { email });
    return user.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
  //return login;
};

const resetPasswordService = async ({ token, password }: { token: string; password: string }) => {
  try {
    const user = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset`, {
      token,
      password,
    });
    return user.data;
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

const refreshTokenService = async (refreshToken: string) => {
  console.log("goi api de refresh");
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/forgot`, {
      refreshToken,
    });
    return res.data.accessToken ?? "";
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unknown error", e);
    }
  }
};
export {
  loginService,
  googleService,
  refreshTokenService,
  registerService,
  forgotPasswordService,
  resetPasswordService,
};
