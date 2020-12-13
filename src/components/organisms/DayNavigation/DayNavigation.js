import React from 'react';

import emptyFunction from '../../../Utilities/emptyFunction';

import DailyForecastCard from '../../molecules/DailyForecastCard/DailyForecastCard';
import './daynavigation.scss';

const DayNavigation = props => {
    const { dailyForecastData = [] , action = emptyFunction } = props;

    const dailyForecastDataList = dailyForecastData.map((data,ind) => (<DailyForecastCard 
        key={'daily-forecast-dat-list'+ind}
        id={data.id}
        minTemp={data.minTemp}
        maxTemp={data.maxTemp}
        dayType={data.dayType}
        dayName={data.dayName}
        isClicked={data.isClicked}
        action={action}
    />));

    return(
        <div className={'wa-day-navigation'}>
            {dailyForecastDataList}
        </div>
    );
}

export default DayNavigation;