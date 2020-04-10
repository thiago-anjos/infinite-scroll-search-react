import Axios from 'axios';

const api = Axios.create({
    baseURL: 'https://randomuser.me/api/?results=15'
})

export default api;
