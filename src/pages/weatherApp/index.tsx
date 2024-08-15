import React, { useEffect, useState, useRef } from 'react';
import style from './styles.module.css';
import onMouseDown from './onMouseDown';

export default function Index() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cityName, setCityName] = useState('');
  const pageBodyRef = useRef(null);
  const widgetContainer = useRef(null);
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
       console.log('23');
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
