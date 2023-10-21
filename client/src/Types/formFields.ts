import {DetailedHTMLProps, FormHTMLAttributes, ReactNode} from "react";
import {FieldValues, UseFormProps, ValidateResult} from "react-hook-form";

export interface ReactHookFormProps
    extends Omit<
        DetailedHTMLProps<
            FormHTMLAttributes<HTMLFormElement>,
            HTMLFormElement
        >,
        "onSubmit"
    >,
        ReactHookInputBaseProps {
    onSubmit: (value: any) => Promise<void> | void;
}

export interface ReactHookFormProviderProps
    extends UseFormProps<FieldValues, Record<string, unknown>>,
        ReactHookInputBaseProps {
    children?: ReactNode;
}

export interface ReactHookInputBaseProps {
    required?: boolean;
    validate?: (
        value: string | number | boolean | Record<string, any>
    ) => ValidateResult | Promise<ValidateResult>;
}