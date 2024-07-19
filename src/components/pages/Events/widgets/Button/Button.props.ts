import {ReactNode} from "react";

export default interface Props {
    children?: ReactNode;
    onClick?: () => void;
    filled?: boolean;
    className?: string;
}
