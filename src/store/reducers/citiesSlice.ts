import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getWeatherByCityName} from "../../services/WeatherService";
import {ICity} from "../../types/ICity";


interface InitialStateProps {
    cities: string[]
    isLoading: boolean,
    error: string | null,
}

const initialState: InitialStateProps = {
    cities: [],
    isLoading: false,
    error: null,
}
const citiesSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deleteCity: (state, action: PayloadAction<string>) => {
            state.cities = state.cities.filter(city => city !== action.payload)
        },
        defaultCities: (state) => {
            if (state.cities) {
                if (state.cities.length === 0) {
                    state.cities = ["New York", "Saint Petersburg", "Arkhangelsk"]
                }
            } else {
                state.cities = ["New York", "Saint Petersburg", "Arkhangelsk"]
            }
        },
    },

    extraReducers: {
        [getWeatherByCityName.fulfilled.type]: (state, action: PayloadAction<ICity>) => {
            state.error = '';
            if (state.cities) {
                if (-1 === state.cities.findIndex(city => city === action.payload.name)) {
                    state.cities.push(action.payload.name)
                } else {
                    state.error = 'А city with this name has already been added'
                }
            } else {
                state.cities = []
                state.cities.push(action.payload.name)
            }
            state.isLoading = false;
        },
        [getWeatherByCityName.pending.type]: (state) => {
            state.error = null
            state.isLoading = true;
        },
        [getWeatherByCityName.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },
    }
})
export const {defaultCities, deleteCity} = citiesSlice.actions;
export default citiesSlice.reducer;
