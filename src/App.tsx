import React, {useEffect, useMemo, useState} from 'react';
import Header from "./componetns/Header/Header";
import cl from './App.module.css'
import WeatherCard from "./componetns/WeatherCard/WeatherCard";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import CreateWeatherCard from "./componetns/CreateWeahterCard/CreateWeatherCard";
import Modal from "./componetns/UI/Modal/Modal";
import Input from "./componetns/UI/Input/Input";
import {getWeatherByCityName} from "./services/WeatherService";
import {defaultCities, deleteCity} from "./store/reducers/citiesSlice";

function App() {
    const [modal, setModal] = useState(false)
    const [newCity, setNewCity] = useState<string>('')
    const [newCityToFetch, setNewCityToFetch] = useState<string>('')
    const {cities} = useAppSelector(state => state.citiesSlice)

    const {error} = useAppSelector(state => state.citiesSlice)

    useMemo(() => {
        let city = newCity.split('-')
        setNewCityToFetch(city.join(' '))
    }, [newCity])

    const dispatch = useAppDispatch()

    function addNewCity(e: any) {
        e.preventDefault()
        if (newCity !== '') {
            dispatch(getWeatherByCityName(newCityToFetch))

        }
    }

    useEffect(() => {
        dispatch(defaultCities())
    }, [])

    useEffect(() => {
        if (error === '') {
            setModal(false)
            setNewCity('')
        }
    }, [error])


    function handleDelete(str: string) {
        dispatch(deleteCity(str))
    }

    return (
        <div className="App">
            <Header/>
            <div className={cl.content}>
                {cities.map((city) =>
                    <WeatherCard key={city} cityName={city} deleteCard={handleDelete}/>
                )}
                <CreateWeatherCard setModal={setModal}/>

                <Modal visible={modal} setVisible={setModal}>
                    {error
                        ? <div style={{color: 'black'}}>{error}</div>
                        : ''
                    }
                    <form className={cl.form}>
                        <Input
                            setValue={setNewCity}
                            id={'1'}
                            name={'new-city'}
                            value={newCity}
                            type="text"
                            placeholder="Enter city name"
                        />
                        <button className={cl.btn} onClick={(e: any) => addNewCity(e)}>Add new Location</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default App;
