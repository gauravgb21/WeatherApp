import React from 'react';

import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';
import WeatherIcon from '../../atoms/WeatherIcon/WeatherIcon';
import './weatherdetails_header.scss';

export const WeatherDetailsHeader = props => {
    const { temp = '' , dayType = '' } = props;

    return(
        <div className={'wa-Weatherdetails-header'}>
            <DailyForecastCardText className={'dailyforecastcard-text--dark dailyforecastcard-text--large'} cardText={temp + 'C'}/>
            <WeatherIcon className={'wa-weather-icon--large'} dayType={dayType}/>
        </div>
    );
}

export default WeatherDetailsHeader;