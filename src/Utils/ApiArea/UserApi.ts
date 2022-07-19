import axios from "axios";
import { User } from "../../Models/User";
import globals from "./Globals";

export const login = async (email: string, password: string) => {
  return await axios.post<User>(
    `${globals.urls.users}login?email=${email}&password=${password}`
  );
};

export const registerNew = async (email: string, password: string) => {
  return await axios.post<any>(
    `${globals.urls.users}register?email=${email}&password=${password}`
  );
};
