import AppConfig from '../../core/config/index';
import axios from 'axios';

const client = axios.create({
    baseURL: AppConfig.apiUri,
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

export { client };
