const BASE_URL = '/api/dropzones';

export function create(dropzone){
    return fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(dropzone),
        headers: {'Content-Type': 'application/json'},
    }).then(res => res.json())
}

function getAll(){
    return fetch(BASE_URL).then(res => res.json());
}

export default {
    create,
    getAll
}

