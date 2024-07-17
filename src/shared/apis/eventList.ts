import { client } from './axios';
import { ShortEvent } from '../../domain/entities/events';

const eventList: () => Promise<ShortEvent[]> = async () => {
    const res = await client.get('/api/v0/classic_events');
    const events = res.data['events'];
    if (res.status >= 300) {
        throw new Error();
    }
    return events;
};

export { eventList };
