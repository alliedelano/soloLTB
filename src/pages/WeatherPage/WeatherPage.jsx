import React, {useEffect, useState} from 'react';
import HeaderComp from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import dropzoneApi from '../../utils/dropzoneApi'
import weatherApi from '../../utils/weatherApi'
import WeatherFeed from '../../components/WeatherFeed/WeatherFeed'
import './WeatherPage.css'

export default function WeatherPage({user, handleLogout}){
    
    const [dropzone, setDropzone] = useState({})
    const [loading, setLoading] = useState(true)
    const [weather, setWeather] = useState(null)

    async function getWeather(){
        const data = await dropzoneApi.getDropzone(user.homeDz)
        setDropzone(data.dropzone)
        const weatherData = await weatherApi.getWeather(`https://api.weather.gov/gridpoints/${data.dropzone.gridId}/${data.dropzone.gridX},${data.dropzone.gridY}/forecast`);
        setWeather(weatherData.properties.periods)
        setLoading(false)

    }
    
    useEffect(() => {
        getWeather()
    }, [])
    
    return(
        <>
            <HeaderComp user={user} handleLogout={handleLogout}/>
            <div className="weatherFeed">
                <br />
                <h2 className="dzTitle">{dropzone.name} Weather</h2>
                <br />
            {(loading) ?  <p1>Loading...</p1> :
                <WeatherFeed weather={weather} loading={loading}/>}
            </div>
            <Footer user={user} />
        </>
    )
}