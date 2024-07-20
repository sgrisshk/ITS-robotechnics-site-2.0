import { client } from './axios';
import { News } from '../../domain/entities/news';

const newsList: () => Promise<News[]> = async () => {
    const res = await client.get(`/news/`);
    if (res.status >= 300) {
        throw new Error();
    }
    const data = res.data;
    return data['news'];
};

export { newsList };
