interface ShortEvent {
    id: number;
    title: string;
    photo: string;
}

interface Event extends ShortEvent {
    description: string;
    photo_album_url: string;
    documents_url: string;
    location: string;
    event_date: string;
    social_media_mention: string;
    registration_link: string;
}

interface ShortQuestionnaire {
    id: number;
    searcher_fio: string;
    classic_event: number;
}

export type { ShortEvent, Event, ShortQuestionnaire };
