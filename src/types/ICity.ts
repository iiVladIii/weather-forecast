interface Weather {
    description: string
    icon: string
    id: number
    main: string
}

export interface ICity {
    name: string,
    main: {
        feels_like: number
        grnd_level: number
        humidity: number
        pressure: number
        sea_level: number
        temp: number
        temp_max: number
        temp_min: number
    }
    visibility: number
    weather: Weather[]
    wind: {
        deg: number
        gust: number
        speed: number
    }
}
