

function getWeather(url){
    return fetch(url).then(res => {
		if(res.ok) return res.json()
	  new Error('cannot find weather');
    })
}

export default {
    getWeather
  };
