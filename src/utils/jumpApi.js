import tokenService from './tokenService';
const BASE_URL = '/api/jumps/';

export function create(jump){
    return fetch(BASE_URL, {
        method: 'POST',
        body: jump,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}