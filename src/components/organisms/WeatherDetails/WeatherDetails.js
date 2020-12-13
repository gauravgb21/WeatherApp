import React from 'react';
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import moment from 'moment';

import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';

import WeatherDetailsHeader from '../../molecules/WeatherDetailsHeader/WeatherDetailsHeader';
import WeatherDetailsFooterCard from '../../molecules/WeatherDetailsFooterCard/WeatherDetailsFooterCard';
import './weather_details.scss';

const WeatherDetails = props => {
    const { seriesData = [] , currentWeatherData = {} , dataForWeatherDetails = {} } = props;

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
                type : 'datetime',
                labels : {
                    enabled : true,
                    formatter: function () {
                        return HighCharts.dateFormat('%H:%M', this.value);
    
                    }
                }
            },
            yAxis : {
                labels : {
                    enabled : false
                }
            },
            series: [{
                name : 'Temperature',
                data : [...seriesData]
            }]
        }}/>
    );

    const chartElementForSunRise = (
        <HighChartsReact 
          highcharts={HighCharts} 
          plotOptions={{
              areaSpline : {
                  fillColor : 'orange'
              }
          }}
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
                fillColor : 'rgba(255, 165, 0,.3)',
                color : 'orange',
                data : [0,12,0]
            }]
        }}/>
    );

    console.log('sun rise ',dataForWeatherDetails.sunrise);
    console.log('sunset ',dataForWeatherDetails.sunset);
    console.log('current ',currentWeatherData.dt);

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
                <WeatherDetailsFooterCard  primaryText={'Sunrise'} secondaryText={moment.unix(dataForWeatherDetails.sunrise).format('h:mm a')}/>
                <WeatherDetailsFooterCard  className={'wa-footer-card--text-right'} primaryText={'Sunset'} secondaryText={moment.unix(dataForWeatherDetails.sunset).format('h:mm a')}/>
            </div>
            <div className={'wa-weather-details__chart-sunrise'}>
                {chartElementForSunRise}
            </div>
        </div>
    );
}

export default WeatherDetails;