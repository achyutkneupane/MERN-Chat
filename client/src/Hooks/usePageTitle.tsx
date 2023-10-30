import {useEffect, useState} from "react";
import {APP_NAME} from "@chatSys/env";

export const usePageTitle = () => {
    const [pageTitle, setPageTitle] = useState<string|null>(null);
    const [activeChatBox, setActiveChatBox] = useState<string|null>(null);
    useEffect(() => {
        document.title = pageTitle! || APP_NAME;
    }, [pageTitle]);

    useEffect(() => {
        if(activeChatBox) {
            setPageTitle(activeChatBox);
        }
    }, [activeChatBox]);

    return {
        pageTitle,
        setPageTitle,
        activeChatBox,
        setActiveChatBox
    };
}