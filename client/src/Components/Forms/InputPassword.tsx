import type {InputProps} from "@chatTypes/general.ts";
import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/ai";

const InputPassword = ((props : InputProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-row items-center gap-2">
            <input className="w-full p-2 border border-gray-300 rounded-lg" type={showPassword ? "text" : "password"} {...props} />
            <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </div>
        </div>
    );
});

export default InputPassword;