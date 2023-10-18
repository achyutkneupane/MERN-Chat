import type {InputProps} from "@chatTypes/general.ts";

const InputText = ((props : InputProps) => {
    return <input className="border border-gray-300 rounded-lg p-2 w-80" {...props} />;
});

export default InputText;