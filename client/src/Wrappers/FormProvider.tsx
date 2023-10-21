import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {ReactHookFormProps, ReactHookFormProviderProps} from "@chatTypes/formFields.ts";

export const HookFormProvider = (props: ReactHookFormProviderProps) => {
    const { children, ...rest } = props;
    const methods = useForm(rest);
    return <FormProvider {...methods}>{children}</FormProvider>;
};

export const HookForm = (props: ReactHookFormProps) => {
    const { children, onSubmit, ...rest } = props;
    const { handleSubmit } = useFormContext();
    return (
        <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            {children}
        </form>
    );
};