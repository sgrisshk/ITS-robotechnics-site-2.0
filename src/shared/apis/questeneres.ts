import { client } from './axios';
import { ShortQuestionnaire } from '../../domain/entities/events';

const questenereList: () => Promise<ShortQuestionnaire[]> = async () => {
    const res = await client.get('/questionnaire');
    const questionnaires = res.data['questionnaires'];
    if (res.status >= 300) {
        throw new Error();
    }
    return questionnaires;
};

const questenereById: (id: number) => Promise<ShortQuestionnaire[]> = async (id: number) => {
    const res = await client.get(`/api/v0/classic_events/?page=${id}`);
    const questionnaires = res.data['questionnaires'];
    if (res.status >= 300) {
        throw new Error();
    }
    return questionnaires;
};

export { questenereById, questenereList };
