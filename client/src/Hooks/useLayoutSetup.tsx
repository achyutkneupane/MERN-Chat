import {createContext, useContext} from "react";

interface LayoutSetupContextProps {
    pageTitle: string | null;
    setPageTitle: (title: string | null) => void;
    activeChatBox: string | null;
    setActiveChatBox: (title: string | null) => void;
    refetchSidebar: boolean;
    setRefetchSidebar: (refetch: boolean) => void;
}
export const LayoutSetupContext = createContext<LayoutSetupContextProps|null>(null);
export const useLayoutSetup = () => useContext(LayoutSetupContext)!;