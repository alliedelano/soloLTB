

function getWeather(url){
    return fetch(url).then(res => res.json())
}


export default {
    getWeather
}

