import React, {FC, useEffect, useState} from 'react';
import cl from './WeatherCard.module.css';
import visibilitySvg from '../../assets/images/visibility.svg';
import feelsLikeSvg from '../../assets/images/temperature.svg';
import humiditySvg from '../../assets/images/humidity.svg';
import windSvg from '../../assets/images/wind.svg';
import {cityApi} from "../../services/WeatherService";
import d1 from '../../assets/icons/01d.svg'
import d2 from '../../assets/icons/02d.svg'
import d3 from '../../assets/icons/03d.svg'
import d4 from '../../assets/icons/04d.svg'
import d9 from '../../assets/icons/09d.svg'
import d10 from '../../assets/icons/10d.svg'
import d11 from '../../assets/icons/11d.svg'
import d13 from '../../assets/icons/13d.svg'

interface WeatherCardProps {
    cityName: string,
    deleteCard: (city: string) => void
}

const WeatherCard: FC<WeatherCardProps> = ({cityName, deleteCard}) => {
    const {data: city, error, isLoading} = cityApi.useFetchCityByNameQuery(`${cityName}`)

    const [iconIndex, setIconIndex] = useState(0)
    const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d']
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = new Date()

    const [iconImg, setIconImg] = useState(d1)

    useEffect(() => {
        if (city)
            setIconIndex(icons.findIndex(ic => ic === city.weather[0].icon))
        if (iconIndex === -1) setIconIndex(0)

    }, [city])

    useEffect(() => {
        switch (iconIndex) {
            case -1:
                setIconImg(d1)
                break;
            case 0:
                setIconImg(d1)
                break;
            case 1:
                setIconImg(d2)
                break;
            case 2:
                setIconImg(d3)
                break;
            case 3:
                setIconImg(d4)
                break;
            case 4:
                setIconImg(d9)
                break;
            case 5:
                setIconImg(d10)
                break;
            case 6:
                setIconImg(d11)
                break;
            case 7:
                setIconImg(d13)
                break;
        }
    }, [iconIndex])

    return (
        isLoading
            ? <div className={cl['wrapper']}>Загрузка</div>
            : city
                ? <div className={cl['wrapper']}>
                    <div className={cl.settings}>
                        <div className={cl.deleteBtn} onClick={() => deleteCard(city.name)}><span>...</span></div>
                    </div>
                    <div className={cl['location']}>
                        <div className={cl['locationIcon']}>
                            <img src={iconImg} alt="icon"/>
                        </div>
                        <div className={cl['locationInfo']}>
                            <div className={cl['locationInfoText']}>
                                <h1>{city.name}</h1>
                            </div>
                            <div className={cl['locationInfoDate']}>
                                <p>{days[date.getDay()]} {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={cl['main']}>
                        <div className={cl.temp}>
                            <div className={cl.mainTemp}>
                                {Math.round(city.main.temp - 273)}
                            </div>
                            <div className={cl.mainDegrees}><p>°C</p></div>
                        </div>
                        <div className={cl.mainDescription}>
                            <p>{city.weather[0].description.slice(0, 1).toUpperCase() + city.weather[0].description.slice(1)}</p>
                        </div>
                        <div className={cl["cardWeather"]}>
                            <div className={cl.cardWeatherColumn}>
                                <div className={cl["weatherInf"]}>
                                    <img src={visibilitySvg} alt="visibility-icon"/>
                                    Visibility {Math.round(city.visibility / 1000)} km
                                </div>
                                <div className={cl["weatherInf"]}>
                                    <img src={feelsLikeSvg} alt="temp-icon"/>
                                    Feels like {Math.round(city.main.feels_like - 273)} °C
                                </div>
                            </div>

                            <div className={cl['weatherSeparator']}></div>
                            <div className={cl.cardWeatherColumn}>
                                <div className={cl["weatherInf"]}>
                                    <img src={humiditySvg} alt="humidity-icon"/>
                                    Humidity {city.main.humidity} %
                                </div>
                                <div className={cl["weatherInf"]}>
                                    <img src={windSvg} alt="wind-icon"/>
                                    Wind {city.wind.speed} m/s
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className={cl['wrapper']}>
                    <div className={cl.settings}>
                        ...
                    </div>
                    <div>
                        {/*//@ts-ignore*/}
                        {error ? <div>{error.data.message}</div> : ''}
                    </div>

                </div>
    )
        ;
};

export default WeatherCard;
