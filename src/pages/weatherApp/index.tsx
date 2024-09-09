import React, { useEffect, useState, useRef, Suspense } from 'react';
import style from './styles.module.css';
import onMouseDown from './onMouseDown';
import { FaCircleInfo } from "react-icons/fa6";
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Scene from './Scene';
import GlobeScene from './globeScene';

export default function Index() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [cityName, setCityName] = useState('');
  const pageBodyRef = useRef(null);
  const widgetContainer = useRef(null);

  const handleSearchBar = async (event) => {
    if (event.key === 'Enter') {
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
          if (weather) {
            setData(weather);
            console.log(weather);
          } else {
            throw new Error(weather.message);
          }
        } catch (error) {
          setError(error.message);
        }
      }
    }
  };

  onMouseDown(pageBodyRef, widgetContainer);

  async function loadInitialData() {
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
    return <h1>Loading ... </h1>;
  }

  if (error !== '') {
    return <h1>Error : {error}</h1>;
  }

  return (
    <div id={style.pageBody} ref={pageBodyRef}>
     <Scene/>
      <div id={style.searchSquare}>
        <div id={style.magnifyingGlass}>
          {searchError.length > 0 ? (
            <li id={style.infoIcon}>
              <FaCircleInfo title={searchError} style={{ color: "red", cursor: "pointer" }} />
            </li>
          ) : (
            <div id={style.infoIcon}>
              <FaCircleInfo title="Search a location, i.e. 'London, GB'." style={{ color: "aliceblue" }} />
            </div>
          )}
          <div id={style.handle}></div>
          <input
            autoComplete='off'
            placeholder='Search'
            onKeyDown={handleSearchBar}
            name='search_bar'
            type="text"
            id={style.inputOff}
          />
        </div>
      </div>
      <div id={style.globeSquare}>
        <GlobeScene/>
      </div>
      <div id={style.widgetContainer} ref={widgetContainer}>
        {data && data.list.map((timeStamp) => (
          <LazyWidget key={timeStamp.dt} />
        ))}
      </div>
    </div>
  );
}

function LazyWidget({ timeStamp }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5], 
    ["+2.5deg", "-2.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5], 
    ["+2.5deg", "-2.5deg"]
  );

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  }

  const handleMouseMove = (e) =>{
    const rect = e.target.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const Xpct = mouseX / width - 0.5;
    const Ypct = mouseY / height - 0.5;
    x.set(Xpct);
    y.set(Ypct);
  }
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: '200px',
  });
  const height = 366;
  const width = 256;

  return (
    <Tilt scale={1.015} tiltMaxAngleX={4} tiltMaxAngleY={4}>
    <motion.div style={{rotateX, rotateY}} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} ref={ref} id={style.widget} draggable="false">
      {inView && (
        <>
        <motion.div 
          id={style.widgetDesign}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, height: `${height*0.975}px`, width: `${width*0.975}px` }}
        ><motion.div 
        id={style.widgetDesign}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, height: `${height*0.95}px`, width: `${width*0.95}px` }}
        ><motion.div 
        id={style.widgetDesign}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, height: `${height*0.925}px`, width: `${width*0.925}px` }}
        ><div 
        id={style.widgetDesign} 
        style={{ height: `${height*0.9}px`, width: `${width*0.9}px` }}
        ><h1>Hello Wrld</h1></div></motion.div></motion.div></motion.div>
        </>
      )}
    </motion.div>
    </Tilt>
  );
}

