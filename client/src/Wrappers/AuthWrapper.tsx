import {useLocation} from "react-router-dom";
import type {LayoutProps} from "@chatTypes/general";
import {FC} from "react";
import {useAuth} from "@chatHooks/useAuth.ts";
import Sidebar from "@chatComponents/Layouts/Sidebar.tsx";
import Navbar from "@chatComponents/Layouts/Navbar.tsx";

const AuthWrapper: FC<LayoutProps> = ({children}) => {
    const loc = useLocation();
    const isLoggedIn = useAuth();

    if (!isLoggedIn) {
        if (loc.pathname !== "/login") {
            window.location.href = "/login";
        }
    }

    return (
        <div className="relative">
            <Sidebar/>
            <Navbar/>
            <div className="absolute top-16 left-96 right-0">
                {children}
            </div>
        </div>
    )
}

export default AuthWrapper;