import {LOGIN_TOKEN} from "@chatSys/env";

export const fullName = (firstName? : string, middleName? : string, lastName? : string) => {
    return `${firstName!} ${middleName ? middleName + " " : ""}${lastName!}`;
}

export const logout = () => {
    localStorage.removeItem(LOGIN_TOKEN);
    window.location.reload();
}