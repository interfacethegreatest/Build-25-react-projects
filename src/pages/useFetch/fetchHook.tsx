import { stringify } from 'querystring';
import React, { useEffect, useState } from 'react'

export default function fetchHook(url : string, options = {}) {
  
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null);

  
  async function fetchData(){

    try {

        const response = await fetch(url, {...options});
        if (!response.ok){
            throw new Error(response.statusText);
        }
        const result = await response.json();
        setError(null);
        setData(result);
        setPending(false);

    } catch (error) {
        setError(`${error} : An Error Ocurred`)
        setPending(false);
        
    }

  }
  
  useEffect(()=>{

    fetchData()

  }, [url])
  
    return  {data, error, pending}
}
