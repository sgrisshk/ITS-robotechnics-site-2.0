export interface ShortEvent {
    id: number
    title: string
    photo: string
}

export interface Event extends ShortEvent {
    description: string
    photo_album_url: string
    documents_url: string
    location: string
    event_date: string
    social_media_mention: string
    registration_link: string
}

export interface ShortQuestionnaire {
    id: number
    searcher_fio: string
    classic_event: number
}
