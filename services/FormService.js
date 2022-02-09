import axios from 'axios';

const http = axios.create({
    baseURL: "https://frontend-take-home.fetchrewards.com"
});

class FormService {
    list() {
        return http.get('/form');
    }
    create() {
        return http.get('/form');
    }
}

export default new FormService()

