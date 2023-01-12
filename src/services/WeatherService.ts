import axios from "axios";
import {ICity} from "../types/ICity";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {createAsyncThunk} from "@reduxjs/toolkit";

const key = process.env.REACT_APP_API_KEY


export const getWeatherByCityName = createAsyncThunk(
    'user/login',
    async (cityName: string, thunkAPI) => {
        try {
            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`);
            const response = resp.data;
            return response
        } catch (e) {
            //@ts-ignore
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)


export const cityApi = createApi({
    reducerPath: 'cityApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['City'],
    endpoints: (build) => ({
        fetchCityByName: build.query<ICity, string>({
            query: (city) => ({
                url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
            }),
            providesTags: result => ['City']
        }),
    })
})
