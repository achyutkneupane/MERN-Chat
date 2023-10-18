import {useLocation} from "react-router-dom";
import type {LayoutProps} from "@chatTypes/general";
import {FC} from "react";
import {useAuth} from "@chatHooks/useAuth.ts";

const AuthWrapper: FC<LayoutProps> = ({children}) => {
    const loc = useLocation();
    const isLoggedIn = useAuth();

    if (!isLoggedIn) {
        if (loc.pathname !== "/login") {
            window.location.href = "/login";
        }
    }

    return <>{children}</>;
}

export default AuthWrapper;