import type {ReactNode} from "react";
import type {ReactHookInputBaseProps} from "@chatTypes/formFields.ts";

export interface LayoutProps {
    children: ReactNode;
}

export interface InputProps extends ReactHookInputBaseProps {
    label?: string;
    disabled?: boolean;
    value?: string;
    type?: string;
    name?: string;
    className?: string;
    required?: boolean;
}