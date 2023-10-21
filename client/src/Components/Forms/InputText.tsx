import type {InputProps} from "@chatTypes/general.ts";
import {Controller, useFormContext} from "react-hook-form";

const InputText = ((props: InputProps) => {
    const {name, validate, required, label, type, ...rest} = props;
    const {control} = useFormContext();
    return (
        <>
            <Controller
                name={name!}
                rules={{required: required && "Required", validate}}
                control={control}
                render={({
                             field,
                             fieldState: {
                                 error: errorField
                             }
                         }) => (
                    <div>
                        <input
                            {...rest}
                            {...field}
                            className="border border-gray-300 rounded-lg p-2 w-full"
                            placeholder={required ? `${label} *` : label}
                            type={type}
                            autoComplete="off"
                        />
                        {errorField && <p className="text-red-400 text-sm">{errorField.message}</p>}
                    </div>
                )}
            />
        </>
    );
});

export default InputText;