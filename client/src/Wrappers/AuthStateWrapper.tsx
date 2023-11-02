import {FC, useEffect, useState} from "react";
import type {LayoutProps} from "@chatTypes/general.ts";
import {UserAuthContext} from "@chatSys/Hooks/useAuth";
import {LOGIN_TOKEN} from "@chatSys/env";
import CenterSpinner from "@chatComponents/Utils/CenterSpinner.tsx";
import {UserResponse} from "@chatTypes/response.ts";
import {getLoggedInUser} from "@chatUtils/fetchers/authFetcher.ts";

const AuthStateWrapper: FC<LayoutProps> = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState<UserResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const token = localStorage.getItem(LOGIN_TOKEN);

    useEffect(() => {
        if (token) {
            getLoggedInUser().then((res) => {
                setLoggedInUser(res.user);
                setIsLoading(false);
            });
        } else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="w-screen h-screen flex bg-primary justify-center items-center select-none">
                    <CenterSpinner/>
                </div>
            ) : (
                <UserAuthContext.Provider value={loggedInUser}>
                    {children}
                </UserAuthContext.Provider>
            )}
        </>
    );
};

export default AuthStateWrapper;