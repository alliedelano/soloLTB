import tokenService from './tokenService';
const BASE_URL = '/api/permissions/';

export function create(permission){
    return fetch(BASE_URL, {
        method: 'POST',
        body: permission,
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
          }
    }).then(res => res.json());
}

export function getPermissions(userId){
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}