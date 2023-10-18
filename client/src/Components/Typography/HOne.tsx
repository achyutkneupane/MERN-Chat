import {FC} from "react";
import {LayoutProps} from "@chatTypes/general.ts";

interface HOneProps extends LayoutProps {
    className?: string;
}

const HOne : FC<HOneProps> = ((props) => {
    return (
        <h1 {...props} className={`text-3xl font-bold ${props.className}`}>{props.children}</h1>
    );
});

export default HOne;