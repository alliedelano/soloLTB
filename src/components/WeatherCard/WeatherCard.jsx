import React from 'react';
import { Card, Icon, Image, Segment, Dimmer, Loader } from "semantic-ui-react";

export default function WeatherCard({period, key, loading}){
    return(
        <>
        <Card key={key}>
            {loading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader size="small">Loading</Loader>
                    </Dimmer>
                    <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
                </Segment>
            ) : null}
                <Card.Content>
                    <Card.Header>{period.name}</Card.Header>
                    <Card.Description>Temp: {period.temperature}{period.temperatureUnit}</Card.Description>
                    <Card.Description>Winds: {period.windSpeed} {period.windDirection}</Card.Description>
                    <Card.Description>{period.detailedForecast}</Card.Description>
                </Card.Content>
                <Card.Content>
                    <Image src={period.icon} />
                </Card.Content>
            </Card>
        </>
    )
}

