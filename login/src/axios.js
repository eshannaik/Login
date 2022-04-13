import axios from 'axios'

const Backend = axios.create({
    baseURL : "http://localhost:8001/",
    timeout : 10000,
    headers : {
        'Accept':'text/plain',
    }
});

export default Backend;