import React from 'react';

import './dailyforecastcard_text.scss';

const DailyForecastCardText = props => {
    const { className = '' , cardText = '' } = props;

    return(
        <span className={`dailyforecastcard-text ${className}`}>{cardText}</span>
    );
}

export default DailyForecastCardText;