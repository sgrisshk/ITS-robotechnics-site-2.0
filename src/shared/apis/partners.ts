import { client } from './axios';
import { Partners } from '../../domain/entities/partners';

const partnersList: () => Promise<Partners[]> = async () => {
    const res = await client.get(`/partners`);
    if (res.status >= 300) {
        throw new Error();
    }
    const data = res.data;
    return data['partners'];
};

export { partnersList };
