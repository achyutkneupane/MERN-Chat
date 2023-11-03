import {FC, useEffect, useState} from "react";
import {LayoutProps} from "@chatTypes/general.ts";
import { LayoutSetupContext } from "@chatHooks/useLayoutSetup.tsx";

const PageSetupWrapper: FC<LayoutProps> = ({children}) => {
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [activeChatBox, setActiveChatBox] = useState<string | null>(null);

    const [refetchSidebar, setRefetchSidebar] = useState<boolean>(false);

    useEffect(() => {
        setPageTitle(activeChatBox);
    }, [activeChatBox]);

    useEffect(() => {
        document.title = pageTitle ? pageTitle : "Live Chat";
    }, [pageTitle]);

    return (
        <LayoutSetupContext.Provider value={{
            pageTitle,
            setPageTitle,
            activeChatBox,
            setActiveChatBox,
            refetchSidebar,
            setRefetchSidebar
        }}>
            {children}
        </LayoutSetupContext.Provider>
    );
}

export default PageSetupWrapper;