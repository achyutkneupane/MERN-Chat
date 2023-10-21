import type {LayoutProps} from "@chatTypes/general.ts";

interface ButtonProps extends LayoutProps {
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
}

const Button = ((props : ButtonProps) => {
    return (
        <button className="bg-primary bg-opacity-95 hover:bg-opacity-100 text-white rounded-lg p-2 w-full" {...props}>
            {props.children}
        </button>
    );
});

export default Button;