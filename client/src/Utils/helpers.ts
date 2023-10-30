import {usePageTitle} from "@chatHooks/usePageTitle.tsx";
import {useEffect} from "react";

export const fullName = (firstName? : string, middleName? : string, lastName? : string) => {
    return `${firstName!} ${middleName ? middleName + " " : ""}${lastName!}`;
}

export const setActiveChat = (title: string) => {
    const boxHook = usePageTitle();
    useEffect(() => {
        boxHook.setActiveChatBox(title);
    }, []);
}

export const setTitle = (title: string) => {
    const boxHook = usePageTitle();
    useEffect(() => {
        boxHook.setPageTitle(title);
    }, []);
}