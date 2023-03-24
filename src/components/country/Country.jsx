import "./country.css";
import {useEffect} from 'react';

import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import {  searchByRegion, showAllCountries } from "../../features/countries/countriesAction";
import { reset } from '../../features/countries/countriesSlice';


const Country = () => {
    const {countriesData, loading, error, region, searchTerm} = useSelector((state) => state.country);
    const dispatch = useDispatch();

    /**
     * this useEffect deals with display the countries data. First it makes a api call using the dispath hook from redux
     * to get, grab, and inject the gateway to the data into the state and then using the useSelector hook we hold that data in state
     * and if it is successful in doing that
     * we retrieve the data */
    useEffect(()=>{
        dispatch(showAllCountries());

        if(region){
            dispatch(searchByRegion(region))
        }
        if(error) {
            console.log(error)
        }
        return () => {
            dispatch(reset())
        }
    }, [dispatch, error, region]);

    const data = countriesData.filter((item) => item.name.common.toLowerCase().includes(searchTerm))

    return (
        /**On initial load of the application are data is being prepared and injected into the state manager(store) 
         * the state of the country component makes an inquiry to the state manager to see if it is done loading or not
         * If load and everything is received the component state should have all the data.
         * We run another check for if the data receive is appropriate in length, then if so we run a pure function(map function)
         * and populate the component with the data and populate the UI with it necessary display(Card) */
        <section className="country-container">
            {loading ? (<h1>Loading</h1>) : (
                data.length > 0  && data.map((item,index) =>{
                    return (
                        <Link
                        className="country-card"
                        key={index}
                        to={`/${item.cioc}`}
                        >
                            <div className="countryFlag">
                                <img src={item.flags.svg} alt={item.flags.alt} className="country-image" />
                            </div>
                            <div className="country-content">
                                <h3> {item.name.common} </h3>
                                <p>
                                    Population: <span>{item.population}</span>
                                </p>
                                <p>
                                    Region: <span>{item.region}</span>
                                </p>
                                <p>
                                    Capital: <span>{item.capital}</span>
                                </p>
                            </div>
                        </Link>
                    );
                })
            )}
        </section>
    );
};

export default Country;