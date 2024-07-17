import { client } from './axios';
import { Event } from '../../domain/entities/events';

const questenereList: () => Promise<Event[]> = async () => {
    const res = await client.get('/api/v0/questionnaire');
    const questionnaires = res.data['questionnaires'];
    if (res.status >= 300) {
        throw new Error();
    }
    return questionnaires;
};

export { questenereList };
