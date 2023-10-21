import {createContext, useContext} from "react";

export const UserAuthContext = createContext<boolean|null>(null);
export const useAuth = () => useContext(UserAuthContext);