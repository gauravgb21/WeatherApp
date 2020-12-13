import React from 'react';

import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';
import WeatherIcon from '../../atoms/WeatherIcon/WeatherIcon';
import emptyFunction from '../../../Utilities/emptyFunction';
import './searchlist_item.scss';

const SearchListItem = props => {
    const { name = '' , lat = '' , lon = '' , temp = '' , dayType = '' , action = emptyFunction } = props;
    return(
        <li className={'wa-search-list-item'} onClick={() => action({ type : 'SEARCH_LIST_ITEM_CLICKED' , payload : { cityInfo : { name , lat , lon } } })}>
            <div className={'wa-search-list-item__city-name'}>
                <DailyForecastCardText className={'dailyforecastcard-text--dark dailyforecastcard-text--small'} cardText={name}/>
            </div>
            <div className={'wa-search-list-item__w-details'}>
                <span>
                    <DailyForecastCardText className={'dailyforecastcard-text--dark dailyforecastcard-text--small'} cardText={temp + String.fromCharCode(176) + 'C'}/>
                    <DailyForecastCardText className={'dailyforecastcard-text--light dailyforecastcard-text--small'} cardText={dayType}/>
                </span>
                <WeatherIcon className={'wa-weather-icon--small'} dayType={dayType}/>
            </div>     
        </li>
    );
}

export default SearchListItem;