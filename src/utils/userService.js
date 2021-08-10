import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    body: user,
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Issue with signup! This email or username is already associated with an account.');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    if (res.ok) return res.json();
    throw new Error('Invalid credentials! Please try again or sign up!');
  })
  .then(({token}) => tokenService.setToken(token));
}

function getProfile(username){
  return fetch(BASE_URL + username, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if(res.ok) return res.json();
    throw new Error('invalid credentials')
  })
}

function getAll(){
  return fetch(BASE_URL, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json())
}

function getFriends(dropzoneId){
  return fetch(BASE_URL + 'friends/' + dropzoneId, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => res.json())
}

function getOne(userId){
  return fetch(BASE_URL + "find/" + userId, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken()
    }
  }).then(res => {
    if(res.ok) return res.json();
    throw new Error('could not find user to add as friend')
  })
}


export default {
  signup, 
  logout,
  login,
  getUser,
  getProfile,
  getAll,
  getFriends,
  getOne
};