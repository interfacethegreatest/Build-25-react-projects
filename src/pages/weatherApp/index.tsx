import React, { useEffect, useState, useRef } from 'react';
import style from './styles.module.css';
import onMouseDown from './onMouseDown';
import { styleText } from 'util';
//hide text when not hovering,
export default function Index() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchError , setSearchError] = useState('');
  const [cityName, setCityName] = useState('');
  const pageBodyRef = useRef(null);
  const widgetContainer = useRef(null);
  const handleSearchBar = async (event) => {
    if (event.key === 'Enter') {
      console.log('123')
      const value = event.target.value;
      const containsSymbols = /[^a-zA-Z0-9\s,]/.test(value); // Only allows letters, numbers, and spaces
      if (value.length < 3 || value.length > 25) {
        setSearchError('Input must be between 5 and 25 characters long.');
      } else if (containsSymbols) {
        setSearchError('Input must not contain symbols - other than comma.');
      } else {
        setSearchError(''); 
        try {
          setCityName(value);
          const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=1a4415755168a7a47cc946e7c107fadf`);
          const geo = await geoResponse.json();
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&units=metric&appid=1a4415755168a7a47cc946e7c107fadf`);
          const weather = await response.json();
          if (weather){
            setData(weather)
            console.log(weather)
          }else{
            throw new Error(weather.message);
          }
        } catch (error) {
          //loading state?
          setError(error.message)
        }
      }
    }
  };
  onMouseDown(pageBodyRef, widgetContainer);

  async function loadInitialData(){
    try {
        setLoading(true);
        const city = 'Wood Green';
        setCityName(city);
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=1a4415755168a7a47cc946e7c107fadf`);
        const geo = await geoResponse.json();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&units=metric&appid=1a4415755168a7a47cc946e7c107fadf`);
        const weather = await response.json();
        if (weather) {
            setLoading(false);
            setData(weather);
        } else {
            throw new Error(weather.message);
        }
        console.log(weather);

    } catch (error) {
       setLoading(false);
       setError(error.message);
    }
  }

  useEffect(() => {
    loadInitialData();
  }, []);

  if (loading) {
    return <>
     <h1>Loading ... </h1>
    </>;
  }

  if (error !== '') {
    return <>
     <h1>Error : {error}</h1>
    </>;
  }
  return (
    <div id={style.pageBody} ref={pageBodyRef}>
     <div id={style.searchSquare}>
     {
       searchError.length > 0 ? 
       <p id={style.searchText}>{searchError}</p>
       : 
      <h6 id={style.searchText}>Search a location, i.e. 'London, GB'.</h6>
      }
      <br />
      <div id={style.magnifyingGlass}>
       <div id={style.handle}></div>
       <input autoComplete='off' onKeyDown={handleSearchBar} name='search_bar' type="text" id={style.inputOff} />
      </div>
     </div>
      <div id={style.widgetContainer} ref={widgetContainer}>
        {
          data && data.list.map((timeStamp : any)=>(
            <div id={style.widget} draggable="false"></div>
          ))
        }
      </div>
    </div>
  );
}
