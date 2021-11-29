import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    origin: null,
    destination: null,
    travelTimeInformation: null,
    home: {
        location: null,
        desciption: ""
    },
    work: {
        location: null,
        desciption: ""
    },
    favInfo: [
        {
            id:1,
            icon:"home",
            location:"Home",
            destination:"",
        },
        {
            id:2,
            icon:"briefcase",
            location:"Work",
            destination:"",
        }
    ]
}

export const mapSlice = createSlice({
    name:'map',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.origin = action.payload
        },
        setDestination: (state, action) => {
            state.destination = action.payload
        },
        setTravelTimeInformation: (state, action) => {
            state.travelTimeInformation = action.payload
        },
        setHome: (state, action) => {
            state.home = action.payload
        },
        setWork: (state, action) => {
            state.work = action.payload
        },
        setFavInfo: (state, action) => {
            state.favInfo = action.payload
        }
    }
})

export const {setOrigin, setTravelTimeInformation, setDestination, setHome, setWork, setFavInfo} = mapSlice.actions

export const selectOrigin = (state) => state.map.origin
export const selectDestination = (state) => state.map.destination
export const selectTravelTimeInformation = (state) => state.map.travelTimeInformation
export const selectHome = (state) => state.map.home
export const selectWork = (state) => state.map.work
export const selectFavInfo = (state) => state.map.favInfo

export default mapSlice.reducer