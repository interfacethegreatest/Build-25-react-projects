// implement dynamic time and location,
// addittional text?
// implement location on map,
// implement cards,
import React, { useEffect, useState, useRef, Suspense } from 'react';
import style from './styles.module.css'
import onMouseDown from './onMouseDown';
import { FaCircleInfo } from "react-icons/fa6";
import { useInView } from 'react-intersection-observer';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Scene from './Scene';
import GlobeScene from './globeScene';
import { Heebo, Yellowtail } from "next/font/google";
import data from '../accordion/data';
import { hue } from 'three/webgpu';

const font = Heebo({
  subsets: ["latin"],
  weight: ["500", "700", "400"]
})

const font2 = Yellowtail({
  subsets: ["latin"],
  weight: ["400"],
})

export default function Index() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchError, setSearchError] = useState('');
  const [cityName, setCityName] = useState('');
  const [position, setPosition] = useState([Number, Number]);
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
          setPosition([geo[0].lat, geo[0].lon])
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
      setPosition([geo[0].lat, geo[0].lon])
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&units=metric&appid=1a4415755168a7a47cc946e7c107fadf`);
      const weather = await response.json();
      console.log(weather)
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
            placeholder='Search a city or location. i.e, London, GB'
            onKeyDown={handleSearchBar}
            name='search_bar'
            type="text"
            id={style.inputOff}
          />
        </div>
      </div>
      <h2 id={style.dateTime} className={font.className}>{data && data.list[0].dt_txt}</h2>
      <h2 id={style.location} className={font.className}>{data && data.city.name}</h2>
      <div id={style.globeSquare}>
        <GlobeScene lat={position[0]} long={position[1]}/>
      </div>
      <div id={style.widgetContainer} ref={widgetContainer}>
       {data && data.list.map((_, index) => (
        <LazyWidget key={index} data={data.list[index]} />
       ))}
      </div>
    </div>
  );
}

function LazyWidget({ data }) {
  var backgroundHue;
  if (data.main.temp <= 8 ){
    backgroundHue = "/medias/background.jpg";
  }
  if ( data.main.temp > 8 && data.main.temp <= 12) {
    backgroundHue = "/medias/backgroundMild.jpg"
  }
  if(data.main.temp > 12) {
    backgroundHue = "/medias/backgroundHot.jpg"
  }
  var heatIcon = data.weather[0].main.toLowerCase();
  var heatImg;
  switch(heatIcon) {
    case "clear":
      heatImg = "/medias/clear.png"
      break;
    case "clouds":
      heatImg = "/medias/clear.png"
      break;
    case "rain":
      heatImg = "/medias/rain.png"
      break;
    case "drizzle":
      heatImg = "/medias/rain.png"
      break;
    case "thunderstorm":
      heatImg = "/medias/thunder.png"
      break;
    case "snow":
      heatImg = "/medias/ice.png"
      break;
    case "mist":
     heatImg = "/medias/mist.png"
     break;
    case "smoke":
      heatImg = "/medias/mist.png"
      break;
    case "haze":
      heatImg = "/medias/mist.png"
      break;
    case "dust":
      heatImg = "/medias/sand.png"
      break;
    case "fog":
      heatImg = "/medias/mist.png"
      break;
    case "sand":
      heatImg = "/medias/sand.png"
      break;
    case "ash":
      heatImg = "/medias/sand.png"
      break;
    case "squall":
      heatImg = "/medias/rain.png"
      break;
    case "tornado":
      heatImg = "/medias/tornado.png"
      break;
  }


  console.log(data)
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
        {/*<motion.div 
          id={style.widgetDesign}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, height: `${height*0.975}px`, width: `${width*0.975}px` }}
        ><div 
        id={style.widgetDesign} 
        style={{ height: `${height*0.96}px`, width: `${width*0.9}px` }}
        ><h1>Hello Wrld</h1></div></motion.div>
        */}
         <div id={style.card} style={{backgroundImage:`url("${backgroundHue}")`}}>
          <section className={style.titleRow}>
            <p className={style.rarity}><b>{data.weather[0].description[0].toUpperCase()+ data.weather[0].description.slice(1)}</b></p>
            <h1 className={style.name}><b>{data.weather[0].main}</b></h1>
            <p className={style.health}>{data.main.temp+" °C "}</p>
            <img className={style.elementIcon} src={heatImg} />
          </section>
          <section className={style.weatherImg}>
            <img src="medias\charmander.jpg" alt="" />
          </section>
          <section className={style.weatherMeta}>
           <p><b>{data.dt_txt}</b></p>
          </section>
          <section className={style.weatherAbility}>
           <span className={style.abilityCost}>
				    <img className={style.elementIcon} src="medias\clouds.png"/>
           </span>
			     <span className={style.abilityDescription}>
				    <span className={style.abilityName}>Clouds</span>
			     </span>
			     <p className={style.abilityDamage}>{data.clouds.all}</p>
          </section>
          <section className={style.weatherAbility}>
           <span className={style.abilityCost} style={{transform:"translateY(-10px)"}}>
				    <img className={style.elementIcon} src="medias\rain.png"/>
				    <img className={style.elementIcon} src="medias\rain.png"/>
				    <img className={style.elementIcon} src="medias\rain.png"/>
				    <img className={style.elementIcon} src="medias\rain.png"/>
			     </span>
			     <span className={style.abilityDescription}>
				    <p style={{fontSize:"11px", transform:"translate(8px,-12px)"}}><span className={style.abilityName}>Rain</span>Rain volume last 3 hours. <img className={style.elementIcon} src="medias\rain.png" /> Rain volume in mm as units of measurement.</p>
			      </span>
			      <p className={style.abilityDamage}>{data.rain && data.rain["3h"] ? data.rain["3h"] : 0}</p>
          </section>
          <section className={style.weatherStats}>
            <span className={style.characterStat}>
              <p style={{transform:"translateY(-12px)"}}>humidity {data.main.humidity}</p>
              <img style={{transform:"translateY(-2px)"}} src="medias\fire.png" className={style.elementIcon} />
            </span>
            <span className={style.characterStat}>
              <p style={{transform:"translateY(-12px)"}}>pressure - {data.main.pressure}</p>
              <img style={{transform:"translateY(-2px)"}} src="medias\pressure.png" className={style.elementIcon} />
            </span>
            <span className={style.characterStat}>
              <p style={{transform:"translateY(-12px)"}}>wind - {data.wind.speed} m/h</p>
              <img style={{transform:"translateY(-2px)"}} src="medias\thunder.png" className={style.elementIcon} />
            </span>
          </section>
          <section className={style.weatherDescription}>
          <p>Minimum temperature at the moment of calculation {data.main.temp_min}°C. Max temperature at moment of calculation {data.main.temp_max}°C.
				   Feels like {data.main.feels_like}°C.
          </p>
          </section>
          <section className={style.cardDetails}>
            <p className={style.artist}>Drew Ellington</p>
            <p className={style.company}>&copy;2024, 96, 96 Nintendo, Creatures, GAMEFREAK. &copy;1999 Wizards.</p>
            <p className={style.collectorCardNumber}>46/120</p>
          </section>
         </div>
        </>
      )}
    </motion.div>
    </Tilt>
  );
}

