import type {InputProps} from "@chatTypes/general.ts";
import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import {Controller, useFormContext} from "react-hook-form";

const InputPassword = ((props : InputProps) => {

        const [showPassword, setShowPassword] = useState(false);
        const {name, required, validate, label, type, ...rest} = props;
        const {control} = useFormContext();

        return (
            <div className="flex flex-row items-center gap-2">
                <Controller
                    name={name!}
                    control={control}
                    rules={{required: required && "Required", validate}}
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
                                className="border border-gray-300 rounded-lg p-2 w-80"
                                placeholder={required ? `${label} *` : label}
                                type={showPassword ? "text" : "password"}
                                autoComplete="off"
                            />
                            {errorField && <p className="text-red-400 text-sm">{errorField.message}</p>}
                        </div>
                    )}
                />
                <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </div>
            </div>
        );
});

export default InputPassword;