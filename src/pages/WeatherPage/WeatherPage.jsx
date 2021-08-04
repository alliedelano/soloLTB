import React, {useEffect, useState} from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import dropzoneApi from '../../utils/dropzoneApi'
import weatherApi from '../../utils/weatherApi'
import WeatherFeed from '../../components/WeatherFeed/WeatherFeed'
import { findAllByTestId } from '@testing-library/react';

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
            <MenuBar />
            <Header user={user}/>
            <h2>{dropzone.name} Weather</h2>
            {(loading) ?   <p1>Loading...</p1> :
                <WeatherFeed weather={weather} loading={loading}/>}
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}