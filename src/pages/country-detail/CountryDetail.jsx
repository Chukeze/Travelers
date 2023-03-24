import "./country-detail.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";
import { searchByCode } from "../../features/countries/countriesAction";

import { reset} from '../../features/countries/countriesSlice';


const CountryDetail = () => {

    const {error, countrySearched} = useSelector((state) => state.country);
    const dispatch = useDispatch();
    const {code} = useParams();

    useEffect(()=>{
        if(code){
            dispatch(searchByCode(code.toLowerCase()));
        }
        if(error) {
            console.log(error)
        }
        return () => {
            dispatch(reset())
        }
    }, [dispatch, code, error])

  return (
    <main className="theme country-detail-container">
      <Link className="back-button" to="/">
        <i className="fa-solid fa-arrow-left"></i> Back
      </Link>

      <section className="country-detail-content" key={code}>
        {countrySearched.length > 0 ? (
            <>

                <img src={countrySearched[0].flags.svg} alt={countrySearched[0].flags.alt} className="country-detail-image" />

                <div className="country-detail-right">
                        <h1>{countrySearched[0].name.common}</h1>
                        <div className="details">
                            <div className="detail-left">
                            <p>
                                Official Name: <span>{countrySearched[0].name.official}</span>
                            </p>
                            <p>
                                Population: <span>{countrySearched[0].population}</span>
                            </p>
                            <p>
                                Region: <span>{countrySearched[0].region}</span>
                            </p>

                            <p>
                                Sub Region: <span>{countrySearched[0].subregion}</span>
                            </p>
                            <p>
                                Capital: <span>{countrySearched[0].capital}</span>
                            </p>
                            </div>

                            <div className="detail-right">
                            <p>
                                Top Level Domain: <span>{countrySearched[0].tld}</span>
                            </p>
                            <p>
                                Currencies:
                                <span>
                                {Object.values(countrySearched[0].currencies).map((item,index) => {return (
                                <>
                                    <span>{item.name}</span>
                                    <span>{item.symbol}</span>
                                    {/**
                                     * The index parameter in the map() function represents the current index of the array being looped over.
                                     * When the code runs and checks whether the current index is not equal to the last index of the array 
                                     * (which is obtained by subtracting 1 from the length of the array) 
                                     * using the condition index !== Object.values(countrySearched[0].currencies).length - 1. 
                                     * If the condition is true, add a comma and a space after the currency item using the string ", ". 
                                     * Otherwise, we don't add anything. 
                                     * This should result in a list of currencies separated by commas and spaces, 
                                     * with no comma after the last currency item. */}
                                    {index !== Object.values(countrySearched[0].currencies).length - 1 && ", "}
                                </>
                                )}
                            )}
                                </span>
                                
                            </p>

                            <p>
                                Languages:
                                <span>{Object.values(countrySearched[0].languages).map((item) => {
                                    return item
                                }).join(',')}</span>
                            </p>
                        </div>
                    </div>
                    <div className="border">
                        <p>Border Countries:</p>
                        {countrySearched[0].borders ? (countrySearched[0].borders.map((item,index)=>{
                            return(
                                <Link className="border-name" to={`/${item}`} key={index}>
                                    <p>{item}</p>
                                </Link>
                            )
                        })) : (<span>No Borders </span>)}
                    </div>
                </div>
            </>
            ) : (<div> no Details Found</div>)
        }
        
      </section>
    </main>
  );
};

export default CountryDetail;