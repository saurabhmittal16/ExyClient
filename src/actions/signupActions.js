import axios from 'axios';
import config from '../config';

export const signup = async values => {
    const res = await axios.post(`${config.server_url}/api/auth/admin/signup`, values);
    return res;
}