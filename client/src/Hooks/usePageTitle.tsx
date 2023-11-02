import {createContext, useContext} from "react";

interface PageTitleContext {
    pageTitle: string | null;
    setPageTitle: (title: string | null) => void;
    activeChatBox: string | null;
    setActiveChatBox: (title: string | null) => void;
}
export const PageTitleContext = createContext<PageTitleContext|null>(null);
export const usePageTitle = () => useContext(PageTitleContext)!;