import {FC} from "react";
import {useLocation} from "react-router-dom";
import {LayoutProps} from "@chatTypes/general.ts";
import {useAuth} from "@chatHooks/useAuth.ts";

const GuestWrapper: FC<LayoutProps> = ({children}) => {
    const loc = useLocation();
    const isLoggedIn = useAuth();

    if (isLoggedIn) {
        if (loc.pathname !== "/") {
            window.location.href = "/";
        }
    }

    return <>{children}</>;
}

export default GuestWrapper;