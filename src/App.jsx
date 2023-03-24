import './App.css';
import Home from "./pages/home/Home";
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import CountryDetail from './pages/country-detail/CountryDetail';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Header />}>
          <Route index element={<Home/>}/>
          <Route path='/:code' element={<CountryDetail/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
