import AppConfig from './../../core/config/index'
import axios from 'axios'

const client = () => {
    axios.defaults.baseURL = AppConfig.apiUri
}

export default client