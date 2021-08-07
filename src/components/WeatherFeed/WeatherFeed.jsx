import React from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard'
import {Card, Segment, Dimmer, Loader, Image} from 'semantic-ui-react'
import './WeatherFeed.css'

export default function WeatherFeed({weather, loading}){
    return(
        <>
          <div className="weather-feed">
    <Card.Group stackable>
    {loading ? (
        <Segment>
          <Dimmer active inverted>
            <Loader size="small">Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      ) : null}
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
    </div>
        </>
    )
}