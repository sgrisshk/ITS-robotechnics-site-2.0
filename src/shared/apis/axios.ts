import AppConfig from '../../core/config/index';
import axios from 'axios';

const client = axios.create({
    baseURL: `${AppConfig.apiUri}/api/v0`,
    timeout: 1000
});

export { client };