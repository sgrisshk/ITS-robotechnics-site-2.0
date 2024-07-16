import { client } from './axios';
import { Achievement } from '../../domain/entities/achievements';

const achievementsList: () => Promise<Achievement[]> = async () => {
    const res = await client.get(`/achievements`);
    if (res.status >= 300) {
        throw new Error();
    }
    const data = res.data;
    return data['data'];
};

export { achievementsList };
