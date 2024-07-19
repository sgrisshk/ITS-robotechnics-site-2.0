import React, {FC} from "react";
import closeIcon from "../../../../assets/icons/close.svg";
import backIcon from "../../../../assets/icons/back.svg";
import Button from "../Button";
import {AppTextTheme} from "../../theme";

interface ListPopupProps {
    onClose?: () => void,
    onBack?: () => void
    title?: React.ReactNode,
    children?: React.ReactNode,
    backgroundColor?: string
}

const ListPopup: FC<ListPopupProps> = ({
                                           onClose,
                                           onBack,
                                           title,
                                           children,
                                       }) => {
    return (
        <div
            className={
                `
                tw-w-screen tw-h-screen
                tw-absolute tw-left-0 tw-right-0  tw-top-0  tw-bottom-0 tw-z-[10000] 
                tw-flex tw-flex-row
                tw-overflow-clip
                `
            }
        >
            <div
                className={'tw-h-screen  lg:tw-w-full tw-opacity-70 tw-bg-black tw-overflow-clip'}
                onClick={onClose}
            ></div>
            <div className={'tw-h-screen tw-w-full tw-bg-red-500 tw-relative'}>
                <div className={'tw-absolute tw-inset-0 tw-bottom-auto tw-flex tw-justify-between tw-p-10 xl:tw-p-20'}>
                    <Button onClick={onBack}>{onBack && <img src={backIcon} alt={'back icon'}/>}</Button>
                    <Button onClick={onClose}><img alt={'close icon'} src={closeIcon}/></Button>
                </div>
                <div className={'tw-h-11 lg:tw-h-12 xl:tw-h-28'}/>
                <h4 className={AppTextTheme.pageSubHeader}>{title}</h4>
                <div className={'tw-h-16 lg:tw-h-12 xl:tw-h-8'} />
                <div className={'tw-overflow-scroll tw-h-2/3 tw-p-10 tw-px-auto'}>
                    {children}
                </div>
                <div className={'tw-h-4'}/>
            </div>
        </div>
    )
}

// export const ListPopup = ({onClose, title, children, onBack, backgroundColor}: ListPopupProps) => {
//     return (
//         <div
//             style={{
//                 position: 'absolute',
//                 height: '100vh',
//                 width: '100vw',
//                 overflow: 'clip',
//                 paddingBottom: '16px',
//                 top: 0,
//                 right: 0,
//                 bottom: 0,
//                 left: 0,
//             }}
//         >
//             {onBack !== undefined ? <button
//                 style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     position: 'absolute',
//                     top: 80 / 1080 * window?.innerHeight,
//                     left: 1023 / 1900 * window?.innerWidth,
//                     width: 100,
//                     height: 100,
//                     justifyContent: 'end',
//                     zIndex: 9999999,
//                 }}
//                 onClick={onBack}
//             >
//                 <img
//                     style={{
//                         width: 70,
//                         height: 70,
//                         // objectFit: 'cover',
//                         userSelect: 'none',
//                     }}
//                     src={backIcon}
//                     alt='menu'
//                 />
//             </button> : null}
//             <button
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     right: '50%',
//                     bottom: 0,
//                     left: 0,
//                     cursor: 'default',
//                     backgroundColor: 'black',
//                     opacity: 0.7,
//                     border: 'none',
//                     content: ''
//                 }}
//                 onClick={onClose}
//             />
//             <div
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     right: 0,
//                     bottom: 0,
//                     left: '50%',
//                     backgroundColor: backgroundColor,
//                     zIndex: 999999,
//                     padding: '135px 117px',
//                 }}
//             >
//                 <h3
//                     style={{
//                         textTransform: 'uppercase',
//                         color: "white",
//                         fontSize: 45,
//                         fontWeight: 900,
//                         lineHeight: 45 / 45,
//                         textAlign: 'center',
//                         marginBottom: 20,
//                     }}
//                 >{title}</h3>
//                 <div
//                     style={{
//                         overflow: 'scroll',
//                         height: '100%',
//                         paddingBottom: '16px',
//                     }}
//                 >
//                     {children}
//                 </div>
//             </div>
//             <button
//                 style={{
//                     backgroundColor: 'transparent',
//                     border: 'none',
//                     position: 'absolute',
//                     top: 80 / 1080 * window?.innerHeight,
//                     right: 100 / 1900 * window?.innerWidth,
//                     zIndex: 500,
//                     width: 100,
//                     height: 100,
//                     justifyContent: 'end',
//                 }}
//                 onClick={onClose}
//             >
//                 <img
//                     style={{
//                         objectFit: 'none',
//                         userSelect: 'none',
//                     }}
//                     src={closeIcon}
//                     alt='menu'
//                 />
//             </button>
//
//         </div>
//     );
// }


export default ListPopup;
