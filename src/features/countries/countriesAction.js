import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

//show all countries
export const showAllCountries = createAsyncThunk("countries/showAll", 
    async(_, thunkAPI) =>{
        try {
            const response = await axios.get(`https://restcountries.com/v3.1/all`);
            return response.data;
        } catch(err) {
            const message = (err.response && err.response.data) || err.message;
            //rejectWithValue sends the error mssg as a payload
            return thunkAPI.rejectWithValue(message);
        }
    }
);

//search by cioc code
export const searchByCode = createAsyncThunk('countries/searchByCode', async(code,thunkAPI) => {
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
        return response.data;
    }catch(err){
        const message = (err.response && err.response.data) || err.message;
        //rejectWithValue sends the error mssg as a payload
        return thunkAPI.rejectWithValue(message);
    }
});


//searchByRegion
export const searchByRegion = createAsyncThunk("countries/searchByRegion", async(region, thunkAPI) => {
    try {
        const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data) || error.message;
        //rejectWithValue sends the error mssg as a payload
        return thunkAPI.rejectWithValue(message);
    }
});