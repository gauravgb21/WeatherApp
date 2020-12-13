import React from 'react';

import emptyFunction from '../../../Utilities/emptyFunction';

import WeatherIcon from '../../atoms/WeatherIcon/WeatherIcon';
import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';
import './daily_forecast_card.scss';

const DailyForecastCard = props => {
    const { id = '' , minTemp = 0 , maxTemp = 0 , dayType = '' , dayName = '' , isClicked = false , action = emptyFunction } = props;
    return(
        <div className={`wa-daily-frct-card ${isClicked ? 'wa-daily-frct-card--clicked' : ''}`} onClick={() => action({ type : 'NAV_CARD_CLICKED' , payload : { _id : id }})}>
            <div className={'wa-daily-frct-card__day-row'}>
                <DailyForecastCardText className={'dailyforecastcard-text--dark'} cardText={dayName}/>
            </div>
            <div className={'wa-daily-frct-card__temp-row'}>
                <DailyForecastCardText className={'dailyforecastcard-text--dark'} cardText={maxTemp+String.fromCharCode(176)}/>
                <DailyForecastCardText className={'dailyforecastcard-text--light'} cardText={maxTemp+String.fromCharCode(176)}/>
            </div>
            <div className={'wa-daily-frct-card__daytypeicon-row'}>
                <WeatherIcon dayType={dayType}/>
            </div>
            <div className={'wa-daily-frct-card__daytype-row'}>
                <DailyForecastCardText className={'dailyforecastcard-text--light'} cardText={dayType}/>
            </div>
        </div>
    );
}

export default DailyForecastCard;