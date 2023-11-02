import {createContext, useContext} from "react";
import {UserResponse} from "@chatTypes/response.ts";

export const UserAuthContext = createContext<UserResponse|null>(null);
export const useAuth = () => useContext(UserAuthContext);