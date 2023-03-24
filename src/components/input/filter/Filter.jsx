import { useState,useEffect } from "react";

import "./filter.css";

//Redux
import { useDispatch } from "react-redux";
import { reset, setRegion } from "../../../features/countries/countriesSlice";

const Filter = () => {
    const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [filter, setFilter] = useState("");
    const [displayDropdown, setDisplayDropdown] = useState(false);

    const dispatch = useDispatch();
/**
 * This handle dropdown function deal with the handling the display of the filter option
 * when clicked. it initial state is set to false so that the dropdown is close
 * but on click the function changes the state by negating the initial state thus
 * making it true and then causing the logical check down in the jsx to perform its 
 * functionality which is the actual revealing of the dropdown, 
 * listening for user selection and then storing that in state,
 * so that the input value can be updated to show the new state value, 
 * and then closing the drop down.
 */
    const handleDropdown = () => {
        setDisplayDropdown(!displayDropdown);
    }

    useEffect(() => {
      if(filter !== ''){
        dispatch(setRegion(filter.toLowerCase()));
      }
      return ()  => {
        dispatch(reset())
      }
    }, [dispatch, filter])
  return (
    <section className="filter-container">
      <div className="filter" onClick={handleDropdown}>
        <input
          type="text"
          readOnly
          placeholder="Filter by Region"
          value={filter}
          className="filter-input"
        />

        <i className="fa-solid fa-angle-down"></i>
      </div>
      {displayDropdown ? (
        <div className="dropdown">
            {regions.map((item,index) => {
                return (
                    <div key={index} className='dropdown-item' onClick={()=>{
                          setFilter(item);
                          handleDropdown();
                        }
                    }>
                        {item}
                    </div>
                )
            })}
        </div>
      ) : null}
    </section>
  );
};

export default Filter;