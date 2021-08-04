import React, {useEffect, useState} from 'react';
import MenuBar from '../../components/MenuBar/MenuBar'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import dropzoneApi from '../../utils/dropzoneApi'
import weatherApi from '../../utils/weatherApi'
import WeatherFeed from '../../components/WeatherFeed/WeatherFeed'

export default function WeatherPage({user, handleLogout}){
    
    const [dropzone, setDropzone] = useState({})
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(true)
    const [weather, setWeather] = useState(null)
    // const [gridId, setGridId] = useState('')
    // const [gridX, setGridX] = useState('')
    // const [gridY, setGridY] = useState('')


    async function getDropzone(){
        const data = await dropzoneApi.getDropzone(user.homeDz)
        setDropzone(data.dropzone)
        setUrl(`https://api.weather.gov/gridpoints/${data.dropzone.gridId}/${data.dropzone.gridX},${data.dropzone.gridY}/forecast`)
        // setGridId(data.dropzone.gridId)
        // setGridX(parseInt(data.dropzone.gridX))
        // setGridY(parseInt(data.dropzone.gridY))
    }

    async function getWeather(){
        console.log(url)
        const data = await weatherApi.getWeather(url)
        setWeather([...data.properties.periods])
        setLoading(false)
        console.log(weather)
        //setLoading(false)
    }
    
    useEffect(() => {
        getDropzone().then(getWeather())
    }, [])
    
    return(
        <>
            <MenuBar />
            <Header user={user}/>
            <h2>{dropzone.name} Weather</h2>
            
            <WeatherFeed weather={weather} loading={loading}/>
            <Footer user={user} handleLogout={handleLogout}/>
        </>
    )
}