import React, {FC} from "react";
import {Event} from '../../entity';
import {AppTextTheme} from "../../theme";
import RegButton from "../RegButton";
import Button from "../Button";

interface EventCardProps {
    event: Event,
    onClickInfo?: () => void;
    onClickListParticipants?: () => void;
}


const EventCard: FC<EventCardProps> = ({event, onClickInfo, onClickListParticipants}) => {
    const {title, description} = event;

    return (
        <div
            className={
                `
                tw-mx-auto
                ${AppTextTheme.pageDescription}
            `}
        >
            <h1 className={AppTextTheme.pageHeader}>{title}</h1>
            <div className={'tw-h-8 lg:tw-h-10 xl:tw-h-20'}/>
            <p className={
                'tw-h-2/5 tw-overflow-clip ' +
                'tw-border-2 md:tw-border-0 ' +
                'tw-p-6 tw-border-red-700 tw-rounded-3xl'
            }>{description}</p>
            <div className={'tw-h-6 lg:tw-h-7 xl:tw-h-12'}/>
            <RegButton onClick={() => window.open(event.registration_link)}/>
            <div className={'tw-h-14'}/>
            <div className={
                'tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-between tw-gap-4 lg:tw-gap-10 xl:tw-gap-16 '
            }
            >
                <Button filled={true} onClick={onClickListParticipants}>СПИСОК КОМАНД</Button>
                <Button filled={true} onClick={onClickInfo}>ПОДРОБНЕЕ</Button>
                <div className={'tw-h-12'}/>
            </div>
        </div>
    )
}

export default EventCard;