import { client } from './axios';
import { Event } from '../../domain/entities/events';

const questenereById: (id: number) => Promise<Event[]> = async (id: number) => {
    const res = await client.get(`/api/v0/classic_events/?page=${id}`);
    const questionnaires = res.data['questionnaires'];
    if (res.status >= 300) {
        throw new Error();
    }
    return questionnaires;
};

export { questenereById };
