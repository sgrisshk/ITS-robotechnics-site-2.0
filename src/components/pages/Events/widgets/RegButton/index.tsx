import {AppColors, AppTextTheme} from "../../theme";
import React, {FC} from "react";
import Props from "./Reg.props";


const RegButton: FC<Props> = ({onClick}) => {
    return (
        <button
            className={
                'tw-flex tw-gap-2.5 tw-justify-items-top tw-items-center'
            }
            onClick={onClick}
        >
            <div style={{
                backgroundColor: AppColors.red,
                content: '',
                alignSelf: 'center',
                width: 27,
                height: 27,
                borderRadius: 100,
                textAlign: 'center',
            }}/>
            <div style={{width: 13}}/>
            <div className={AppTextTheme.importantButtonLabel}>
                ЗАРЕГИСТРИРОВАТЬСЯ
            </div>
            <span
                className={'tw-relative tw--top-2 tw-text-lg tw--rotate-45 tw-text-white'}
            >➔</span>
        </button>
    )
}


export default RegButton;
