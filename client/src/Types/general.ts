import {ReactNode} from "react";

export interface LayoutProps {
    children: ReactNode;
}

export interface InputProps {
    placeholder?: string;
    disabled?: boolean;
    value?: string;
    onChange?: (e: any) => void;
    type?: string;
}