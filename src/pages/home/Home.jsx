import Country from "../../components/country/Country";
import Filter from "../../components/input/filter/Filter";
import Search from "../../components/input/search/Search";
import "./home.css";

const Home = () => {
  return (
    <main className="theme home-page-container">
      <div className="input-container">
        <Search />
        <Filter />
      </div>
      <Country />
    </main>
  );
};

export default Home;