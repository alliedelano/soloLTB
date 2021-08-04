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

export function getAll(){
    return fetch(BASE_URL, {
        headers: {
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }).then(res => res.json())
}

export function findJumpers(jumpId){
    return fetch(`${BASE_URL}${jumpId}`, {
        headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
		if(res.ok) return res.json()
	  new Error('cannot find jump');
    })
}
