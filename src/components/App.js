import React, { useState , useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Loader from 'react-loader-spinner';

import Header from  './organisms/Header/Header';
import DayNavigation from './organisms/DayNavigation/DayNavigation';
import WeatherDetails from './organisms/WeatherDetails/WeatherDetails';
import PermissionModal from './organisms/PermissionModal/PermissionModal';

import { CITY_LIST } from '../config/city_list';

import './app.scss';

const App = props => {
    const [searchListData,setSearchListData] = useState([]);
    const [dailyForecastData,SetDailyForecastData] = useState([]);
    const [hourlyForecastData,setHourlyForecastData] = useState([]);
    const [currentWeatherData,setCurrentWeatherData] = useState([]);
    const [seriesData,setSeriesData] = useState([]);
    const [showLoader,setShowLoader] = useState(false);
    const [clickedCity,setClickedCity] = useState('');
    const [showPermissionModal,setShowPermissionModal] = useState(false);
    
    const MAX_CITY_LIMIT = 5;

    const apiKey = '5a16650cf0b28a270d459c9fc2deaea7';

    const fetchPlacesData = payload => {
        const cityIds = [];
        const searchKey = payload.searchKey.toLowerCase();
        
        for(let i = 0; i < CITY_LIST.length; i++){
            if(cityIds.length === MAX_CITY_LIMIT)break;
            if(CITY_LIST[i]["name"].toLowerCase().indexOf(searchKey) > -1)cityIds.push(CITY_LIST[i]["id"]);
        }

        if(payload.searchKey.length > 0){
            axios.get(`https://api.openweathermap.org/data/2.5/group?id=${cityIds}&units=metric&appid=${apiKey}`)
             .then(res => res.data)
             .then(result => {
                 console.log("Result is ",result);
                 const newSearchListData = [];
                 result.list.forEach((itr) => {
                    newSearchListData.push({
                        name : itr.name,
                        lat : itr.coord.lat,
                        lon : itr.coord.lon,
                        temp : itr.main.temp,
                        dayType : itr.weather[0].main
                    });
                 });
                 setSearchListData(newSearchListData);
             })
             .catch((err) => console.log('Error found ',err));
        }
        else{
            setSearchListData([]);
        }
    }

    const fetchDataForCity = payload => {
        const { cityInfo = {} } = payload;
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityInfo.lat}&lon=${cityInfo.lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`)
             .then(res => res.data)
             .then(result => {
                 console.log("one call api res is ",result);
                 
                 //create current data
                 const newCurrentWeatherData = {
                     dt : result.current.dt,
                     humidity : result.current.humidity,
                     pressure : result.current.pressure,
                     sunrise : result.current.sunrise,
                     sunset : result.current.sunset,
                     temp : Math.round(result.current.temp),
                     desc : result.current.weather[0].main,
                     icon : result.current.weather[0].icon
                 };
                 
                 //create hourly data
                 const newHourlyForecastData = [];
                 const newSeriesData = [];

                 result.hourly.forEach((itr,ind) => {
                     newHourlyForecastData.push({
                        dt : itr.dt,
                        humidity : itr.humidity,
                        pressure : itr.pressure,
                        temp : Math.round(itr.temp),
                        dayType : itr.weather[0].main,
                        icon : itr.weather[0].icon
                     });
                     const newObj = {
                         x : parseInt(moment(itr.dt).format('h')) + ind,
                         y : Math.round(itr.temp)
                     };
                     newSeriesData.push(newObj);
                 });
                 
                 //create Daily Data
                 const newDailyForecastData = [];
                 result.daily.forEach((itr,idx) => {
                     newDailyForecastData.push({
                        dt : itr.dt,
                        dayName : moment(itr.dt).format('dddd').substr(0,3),
                        humidity : itr.humidity,
                        pressure : itr.pressure,
                        sunrise : moment(itr.sunrise).format('h:mm a'),
                        sunset : moment(itr.sunset).format('h:mm a'),  
                        maxTemp : Math.round(itr.temp.max),
                        minTemp : Math.round(itr.temp.min),
                        dayType : itr.weather[0].main,
                        icon : itr.weather[0].icon,
                        isClicked : false,
                        dateTime : moment(itr.dt).format('MMMM Do YYYY, h:mm:ss a'),
                        id : idx
                     });
                 });

                 if(newDailyForecastData.length > 0)newDailyForecastData[0].isClicked = true;

                 setCurrentWeatherData(newCurrentWeatherData);
                 setHourlyForecastData(newHourlyForecastData);
                 SetDailyForecastData(newDailyForecastData);
                 setSeriesData(newSeriesData);
                 setShowLoader(false);
              })
             .catch(err => console.log('Error while fetching one call api '));
    }

    const handleHeaderActions = data => {
        console.log("action fired is : ",data);
        const { type = '' , payload = { } } = data;
        switch(type){
            case 'FETCH_PLACES':
                fetchPlacesData(payload);
                break;
            
            case 'RESET_CLICKED':
                setClickedCity('');
                break;

            case 'SEARCH_LIST_ITEM_CLICKED':
                setShowLoader(true);
                fetchDataForCity(payload);
                setSearchListData([]);
                setClickedCity(payload.cityInfo.name);
                break;

            default:
                console.log("No matching action found");
        }
    }

    const handleNavigationActions = data => {
        console.log("action fired is : ",data);
        const { type = '' , payload = { } } = data;
        switch(type){
            case 'NAV_CARD_CLICKED':
                const newDailyForecastData = dailyForecastData.map(itr => ({...itr,isClicked : false}));
                newDailyForecastData.forEach(itr => itr.id === payload._id ? itr.isClicked = true: '');
                SetDailyForecastData(newDailyForecastData);
                break;

            default:
                console.log("No matching action found");
        }
    }

    const handleModalActions = data => {
        const { type = '' , payload = {} } = data;
        switch(type){
            case 'PERMISSION_ALLOWED':
                setShowLoader(true);
                axios.get('http://ip-api.com/json')
                    .then(res => res.data)
                    .then(result => {
                        fetchDataForCity({
                            cityInfo : {
                                lat : result.lat,
                                lon : result.lon       
                            }
                        });
                        setClickedCity(result.city);
                    })
                    .catch(err => console.log('Error while fetching data'));
                setShowPermissionModal(false);
                break;

            case 'PERMISSION_NOT_ALLOWED':
                setShowPermissionModal(false);
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        //get user's location Details code goes here
        setShowPermissionModal(true);
    },[]);

    const dataForWeatherDetails = dailyForecastData.filter((data) => data.isClicked);
    const weatherDetailsElement = dataForWeatherDetails.length > 0 ? (
    <>
        <DayNavigation dailyForecastData={dailyForecastData} action={handleNavigationActions}/>
        <WeatherDetails seriesData={seriesData} dataForWeatherDetails={dataForWeatherDetails[0]}/>
    </>
    ) : '';
    const loaderElement = showLoader ?  (<div className={'wa-loadmask'}>
        <div className={'wa-loader-cont'}>
            <Loader type="ThreeDots" color="#00BFFF" height={50} width={50}/>
        </div>
    
    </div>) : '';

    const permissionModalELement = showPermissionModal ? (
        <div className={'wa-loadmask'}>
            <PermissionModal action={handleModalActions} />
        </div>
    ) : '';

    return(
        <main className={dataForWeatherDetails.length === 0 ? 'wa-app-cont--nodata' : 'wa-app-cont'}>
            {loaderElement}
            {permissionModalELement}
            <Header clickedCity={clickedCity} searchListData={searchListData} action={handleHeaderActions}/>
            {weatherDetailsElement}
        </main>
    );
}

export default App;