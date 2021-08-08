import tokenService from './tokenService';
const BASE_URL = '/api/';

export function addJumper(jumpId){
    return fetch(`${BASE_URL}jumps/${jumpId}/jumpers`, {
        method: 'POST',
        headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
		if(res.ok) return res.json()
	  new Error('Error adding jumper');
    })
}

export function removeJumper(jumperId){
    return fetch(`${BASE_URL}jumpers/${jumperId}`, {
        method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
    }).then(res => {
		if(res.ok) return res.json()
	  new Error('Error removing jumper');
	})
}

export function addFriend(friend, jumpId){
	return fetch(`${BASE_URL}jumps/${jumpId}/addFriend`, {
        method: 'POST',
		body: friend,
        headers: {
			'Authorization': 'Bearer ' + tokenService.getToken()
		}
	}).then(res => {
		if(res.ok) return res.json()
	  new Error('Error adding jumper');
    })
}
