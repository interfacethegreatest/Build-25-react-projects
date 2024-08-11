import React, { useEffect, useState } from 'react'

export default function index() {
  const [ data, setData ] = useState();
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState('');

  async function loadInitialData(){
    try {
        setLoading(true);
        const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=1a4415755168a7a47cc946e7c107fadf');
        const weather = await response.json();
        if ( weather ) {
            setLoading(false);
        }else{
            console.log(weather.cod)
            if (weather.message) {
                return <>
                 <h1>{ weather.message }</h1>
                </>
            }
        }
        console.log(weather);

    } catch (error : any) {
       setLoading(false);
       setError(error.message);
       console.log('23')
    }
  } 
    useEffect(()=>{
    loadInitialData()
  },[])

  if (loading) {
    return <>
     <h1>Loading ... </h1>
    </>
  }

  if ( error != '') {
    return <>
     <h1>Error : {error}</h1>
    </>
  }

  return (
    <div>
      <h1> Hello Weather </h1>
    </div>
  )
}
