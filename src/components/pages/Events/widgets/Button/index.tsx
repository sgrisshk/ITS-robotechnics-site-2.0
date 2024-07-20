import Props from "./Button.props";
import {FC} from "react";
import {AppTextTheme} from "../../theme";

function _getClassNames({className = '', filled = false}: { className?: string, filled?: boolean }): string {
    const filledClass = (
        'tw-border-red-700 md:tw-bg-red-700 ' +
        'tw-border ' +
        'tw-rounded-[60px] ' +
        'tw-h-8 lg:tw-h-12 xl:tw-h-16 ' +
        'tw-w-full'
    );

    return (
        (filled ? filledClass : '')
        + ` ${AppTextTheme.buttonLabel} ${className}`
    );
}

const Button: FC<Props> = ({onClick, children, filled, className}) => {
    return (
        <button
            onClick={onClick}
            className={_getClassNames({className, filled})}
        >
            {children}
        </button>
    );
}


export default Button;
