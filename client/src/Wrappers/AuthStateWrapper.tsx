import {FC, useEffect, useState} from "react";
import type {LayoutProps} from "@chatTypes/general.ts";
import {UserAuthContext} from "@chatSys/Hooks/useAuth";
import {LOGIN_TOKEN} from "@chatSys/env";
import CenterSpinner from "@chatComponents/Utils/CenterSpinner.tsx";

const AuthStateWrapper: FC<LayoutProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const token = localStorage.getItem(LOGIN_TOKEN);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <>
            {isLoggedIn == null ? (
                <div className="w-screen h-screen flex bg-primary justify-center items-center select-none">
                    <CenterSpinner/>
                </div>
            ) : (
                <UserAuthContext.Provider value={isLoggedIn}>
                    {children}
                </UserAuthContext.Provider>
            )}
        </>
    );
};

export default AuthStateWrapper;