import {FC, useEffect, useState} from "react";
import {LayoutProps} from "@chatTypes/general.ts";
import { PageTitleContext } from "@chatSys/Hooks/usePageTitle";

const PageSetupWrapper: FC<LayoutProps> = ({children}) => {
    const [pageTitle, setPageTitle] = useState<string | null>(null);
    const [activeChatBox, setActiveChatBox] = useState<string | null>(null);

    useEffect(() => {
        setPageTitle(activeChatBox);
    }, [activeChatBox]);

    useEffect(() => {
        document.title = pageTitle ? pageTitle : "Live Chat";
    }, [pageTitle]);

    return (
        <PageTitleContext.Provider value={{
            pageTitle,
            setPageTitle,
            activeChatBox,
            setActiveChatBox
        }}>
            {children}
        </PageTitleContext.Provider>
    );
}

export default PageSetupWrapper;