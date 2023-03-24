
import "./search.css";

import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../../features/countries/countriesSlice";

const Search = () => {
  const {searchTerm} = useSelector((state) => state.country);
  const dispatch = useDispatch();

  const handleInputValueChange = (e) => {
    dispatch(setSearch(e.target.value.toLowerCase()));
  }
  return (
    <section className="search-container">
      <div className="search-icon">
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>

      <input
        type="text"
        placeholder="Search for a country"
        className="search-input"
        value={searchTerm}
        onChange={handleInputValueChange}
      />
    </section>
  );
};

export default Search;