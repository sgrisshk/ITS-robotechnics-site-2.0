import './events.scss'
import React, {ReactElement, useState} from 'react';
import logo from '../../assets/icons/logo.svg';
import Carousel from 'react-bootstrap/Carousel';
import ListPopup from './widgets/ListPopup/ListPopup';
import {ListPopupTile} from './widgets/ListPopup/ListPopupTile';
import {useQuery} from '@tanstack/react-query';
import templateBGImage from '../../assets/images/events-template-bg.png';
import moment from 'moment';
import {eventList} from "../../../shared/apis/events";
import EventCard from "./widgets/EventCard";
import {ShortEvent, Event, ShortQuestionnaire} from "./entity";
import SliderNavigateButton from "./widgets/SliderNavigateButton";
import {AppConfig} from "../../../core";


class Colors {
    static red = '#C13100';
}

export interface Questionnaire extends ShortQuestionnaire {
    searcher_bmstu_group: string
    participants_count: number
    required_competencies: string
    seacher_VK: string
    additional: string
}

const placeholderEvent: Event = {
    id: -1,
    title: 'инженерный вызов',
    photo: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    photo_album_url: '',
    documents_url: '',
    location: '',
    event_date: '',
    social_media_mention: '',
    registration_link: 'https://vk.com/',
}


const LayoutComponent = ({children, backgroundImageUrl}: {
    children: string | ReactElement | ReactElement[],
    backgroundImageUrl: string | undefined,
}) => {
    return (
        <div
            style={{
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '100vh',
                overflow: "clip",
                backgroundColor: 'black',
                color: 'white',
                backgroundImage: backgroundImageUrl !== '' ? `linear-gradient( rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85) ), url(${AppConfig.apiUri}${backgroundImageUrl})` : templateBGImage,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                paddingBottom: 80,
            }}>
                <div
                    style={{
                        // paddingTop: 76,
                        // paddingLeft: 160,
                        // paddingRight: 110,
                        // position: 'absolute',
                        // top: 0,
                        // left: 0,
                        // right: 0,
                    }}
                >
                    <a
                        href={'/'}
                    >
                        <img
                            src={logo}
                            className={`
                            tw-absolute
                            tw-mt-5 lg:tw-mt-15 xl:tw-mt-40
                            tw-ml-5 lg:tw-ml-15 xl:tw-ml-40
                            tw-h-12 tw-w-12 lg:tw-h-20 lg:tw-w-20 xl:tw-h-28 xl:tw-w-28
                            `}
                            alt='logo'
                            style={{
                                objectFit: 'cover'
                            }}
                        />
                    </a>
                    <div
                        style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 'max-content',
                            position: 'absolute',
                            color: 'white',
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}



enum PopupType {
    none,
    info,
    listParticipants,
    participant,
}


export const EventsPage = () => {
    const [popup, setPopup] = useState<PopupType>(PopupType.none);

    const {data: events} = useQuery<ShortEvent[]>({
            queryKey: ['event-list'],
            queryFn: () => eventList(),
            placeholderData: () => [
                {
                    id: 1,
                    title: 'инженерный вызов',
                    photo: '',
                }
            ],
        }
    );

    const items: ShortEvent[] = events ?? [];

    const [index, setIndex] = useState(0);

    const {data: fullEvent} = useQuery<Event>({
        enabled: items[index] !== undefined && items[index].id >= 0,
        queryKey: ['events', items[index]?.id],
        queryFn: () => fetch(`${AppConfig.apiUri}/api/v0/classic_events/${items[index].id}/`).then(r => r.json()),
        placeholderData: _ => placeholderEvent,
    });

    const handleSelect = (selectedIndex: number) => {
        if (selectedIndex < 0)
            setIndex(items.length - 1);
        else if (selectedIndex >= items.length)
            setIndex(0);
        else
            setIndex(selectedIndex);
    };

    const [participantId, setParticipant] = useState<number | null>(null)

    const {data: questionnairies} = useQuery<Questionnaire[]>({
        queryKey: ['events', index, 'participants'],
        queryFn: () => fetch(`${AppConfig.apiUri}/api/v0/questionnaire/`)
            .then(r => r.json())
            .then(d => d['questionnaires']),
    });

    const {data: participant} = useQuery<Questionnaire>({
        enabled: participantId != null,
        queryKey: ['events', index, 'participants', participantId],
        queryFn: () => fetch(`${AppConfig.apiUri}/api/v0/questionnaire/${participantId}/`)
            .then(r => r.json()),
    });

    // @ts-ignore
    return (
        <>
            {
                popup === PopupType.listParticipants ? <ListPopup
                    backgroundColor={Colors.red}
                    onClose={() => setPopup(PopupType.none)}
                    title={'ПОИСК КОМАНДЫ'}
                    children={
                        questionnairies?.map(
                            questionnaire => <ListPopupTile
                                onClick={() => {
                                    setPopup(PopupType.participant)
                                    setParticipant(questionnaire.id);
                                }}
                            >
                                    {`Анкета от ${questionnaire.searcher_fio}`}
                            </ListPopupTile>
                        )
                    }
                /> : null
            }
            {
                popup === PopupType.info ? <ListPopup
                    backgroundColor={Colors.red}
                    onClose={() => setPopup(PopupType.none)}
                    title={'ПОДРОБНЕЕ'}
                    children={[
                        <ListPopupTile
                            key={'date'}
                            children={`Дата проведения: ${moment(fullEvent?.event_date).format('YYYY-MM-DD')}`}
                        />,
                        <ListPopupTile
                            key={'location'}
                            onClick={() => window.open(fullEvent?.location)}
                        >
                            Место проведения
                        </ListPopupTile>,
                        <ListPopupTile
                            key={'photo'}
                            onClick={() => window.open(fullEvent?.photo_album_url)}
                        >
                            Фото
                        </ListPopupTile>,
                        <ListPopupTile
                            key={'mentions'}
                            onClick={() => window.open(fullEvent?.social_media_mention)}
                        >
                            Упоминания в СМИ
                        </ListPopupTile>,
                        <ListPopupTile
                            key={'docs'}
                            onClick={() => window.open(fullEvent?.documents_url)}
                        >
                            Документы
                        </ListPopupTile>,
                    ]}
                /> : null
            }
            {
                popup === PopupType.participant ? <ListPopup
                    backgroundColor={Colors.red}
                    onClose={() => setPopup(PopupType.none)}
                    onBack={() => setPopup(PopupType.listParticipants)}
                    title={<>Анкета от: <br/>{participant?.searcher_fio ?? ''}</>}
                    children={[
                        <ListPopupTile>
                            Команда
                        </ListPopupTile>,
                        <ListPopupTile onClick={() => window.open(participant?.seacher_VK)}>Вконтакте</ListPopupTile>,
                        <ListPopupTile>Количество людей: {participant?.participants_count}</ListPopupTile>,
                        <ListPopupTile>
                            <div style={{minHeight: 200, padding: '10px'}}>
                                Компетенции:
                                <p style={{color: '#595959', display: 'block'}}>
                                    {participant?.required_competencies}
                                </p>
                            </div>
                        </ListPopupTile>,
                        <ListPopupTile>
                            <div style={{minHeight: 200, padding: '10px'}}>
                                Дополнительная информация:
                                <p style={{color: '#595959', display: 'block'}}>
                                    {participant?.additional}
                                </p>
                            </div>
                        </ListPopupTile>,
                    ]}
                /> : null
            }
            <LayoutComponent backgroundImageUrl={items[index]?.photo}>
                <div style={{
                    // gap: 82,
                    // paddingTop: 76,
                    // paddingLeft: 160,
                    // paddingRight: 110,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Carousel
                        activeIndex={index}
                        onSelect={handleSelect}
                        slide={false}
                        controls={false}
                        indicators={false}
                        interval={10000000000}
                    >
                        {items.map((event) => {
                            return (
                                <Carousel.Item key={event.title}>
                                    <div className={
                                        'tw-w-screen tw-h-screen ' +
                                        'tw-flex tw-justify-center tw-items-start ' +
                                        'tw-overflow-scroll'
                                    }>
                                        <div className={'tw-w-3/4 lg:tw-h-4/5 tw-mx-auto tw-relative'}>
                                            <div className={'tw-h-28 lg:tw-h-32 2xl:tw-h-44'}/>
                                            <SliderNavigateButton
                                                onClick={() => handleSelect(index - 1)}
                                            />
                                            <SliderNavigateButton
                                                onClick={() => handleSelect(index + 1)}
                                                reversed={true}
                                            />
                                            {
                                                fullEvent !== undefined ?
                                                    <EventCard
                                                        event={fullEvent}
                                                        onClickInfo={() => setPopup(PopupType.info)}
                                                        onClickListParticipants={() => setPopup(PopupType.listParticipants)}
                                                    /> : <></>
                                            }
                                        </div>
                                    </div>
                                </Carousel.Item>
                            );
                        })}

                    </Carousel>
                </div>
            </LayoutComponent>
        </>
    )
}
