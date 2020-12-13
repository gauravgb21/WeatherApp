import React from 'react';
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';

import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';

import WeatherDetailsHeader from '../../molecules/WeatherDetailsHeader/WeatherDetailsHeader';
import WeatherDetailsFooterCard from '../../molecules/WeatherDetailsFooterCard/WeatherDetailsFooterCard';
import './weather_details.scss';

const WeatherDetails = props => {
    const { seriesData = [] , dataForWeatherDetails = {} } = props;

    const chartElement = (
        <HighChartsReact 
          highcharts={HighCharts} 
          options={{
            chart: {
                type: 'areaspline',
                height : '300px'
            },
            title : {
                text : ''
            },
            legend : {
                enabled : false
            },
            xAxis : {
                labels : {
                    enabled : true
                }
            },
            yAxis : {
                labels : {
                    enabled : false
                }
            },
            series: [{
                data : [...seriesData]
            }]
        }}/>
    );

    const chartElementForSunRise = (
        <HighChartsReact 
          highcharts={HighCharts} 
          options={{
            chart: {
                type: 'areaspline',
                height : '150px'
            },
            title : {
                text : ''
            },
            legend : {
                enabled : false
            },
            xAxis : {
                labels : {
                    enabled : true
                }
            },
            yAxis : {
                labels : {
                    enabled : false
                }
            },
            series: [{
                data : [-12,0,12,0,-12]
            }]
        }}/>
    );

    return(
        <div className={'wa-weather-details'}>
            <WeatherDetailsHeader temp={dataForWeatherDetails.maxTemp + String.fromCharCode(176)} dayType={dataForWeatherDetails.dayType}/>
            <div className={'wa-weather-details__chart-wd'}>
                {chartElement}
            </div>
            <div className={'wa-weather-details__pres-hum'}>
                <WeatherDetailsFooterCard className={'wa-footer-card--light-blue'} primaryText={'Pressure'} secondaryText={dataForWeatherDetails.pressure + ' hpa'}/>
                <WeatherDetailsFooterCard className={'wa-footer-card--light-blue'} primaryText={'Humidity'} secondaryText={dataForWeatherDetails.humidity + ' %'}/>
            </div>
            <div className={'wa-weather-details__sun-set'}>
                <WeatherDetailsFooterCard  primaryText={'Sunrise'} secondaryText={dataForWeatherDetails.sunrise}/>
                <WeatherDetailsFooterCard  className={'wa-footer-card--text-right'} primaryText={'Sunset'} secondaryText={dataForWeatherDetails.sunset}/>
            </div>
            <div className={'wa-weather-details__chart-sunrise'}>
                {chartElementForSunRise}
            </div>
        </div>
    );
}

export default WeatherDetails;