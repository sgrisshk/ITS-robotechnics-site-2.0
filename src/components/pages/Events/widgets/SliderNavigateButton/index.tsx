import leftArrow from "../../../../assets/icons/left-arrow.svg";
import React from "react";
import Props from "./SliderNavigateButton.props";

const SliderNavigateButton = ({onClick, reversed = false} : Props) => {
    const leftPosition = !reversed
        ? 'tw--left-12 xl:tw--left-20'
        : 'tw--right-12 xl:tw--right-20';

    return (
        <button
            onClick={onClick}
            className={`
                tw-absolute tw-top-1/2 tw-bottom-1/2 ${leftPosition}
                tw-w-8 md:tw-w-12 xl:tw-w-14
            `}
            style={{
                border: 'none',
                backgroundColor: 'transparent',
            }}
        >
            <img
                className={!reversed ? '' : 'tw-rotate-180'}
                src={leftArrow}
                alt={''}
            />
        </button>
    )
}

export default SliderNavigateButton;
