import React from 'react';

import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';
import './weatherdetails_footer_card.scss';

const WeatherFooterCards = props => {
    const { className= '' , primaryText = '' , secondaryText = '' }= props;

    return(
        <div className={`wa-footer-card ${className}`}>
            <DailyForecastCardText className={'dailyforecastcard-text--dark'} cardText={primaryText}/>
            <br />
            <DailyForecastCardText className={'dailyforecastcard-text--dark'} cardText={secondaryText}/>
        </div>
    );
}

export default WeatherFooterCards;