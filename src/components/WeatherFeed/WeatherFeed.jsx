import React from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import {Card, Segment, Dimmer, Loader, Image} from 'semantic-ui-react'

export default function WeatherFeed({weather, loading}){
    return(
        <>
        
    <Card.Group stackable>
      {weather.map((period) => {
        return (
          <WeatherCard
            period={period}
            key={period.number}
            loading={loading}
          />
        );
      })}
    </Card.Group> 
        </>
    )
}