import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { error } from 'console';

export default function index() {
 const url = 'https://dummyjson.com/products?limit=100'

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')
  const [scrollPercentage, setScrollPercentage] = useState(0)

  async function fetchData(url:string){
    try{
        setLoading(true)
        const response = await fetch(url)
        const data = await response.json();
        if(data && data.products.length > 0){
            setData(data.products)
            setLoading(false)
        }

    }catch(e){
        console.log(e)
        setErrorMessage(e.message)
    }
  }

  useEffect(()=>{
    fetchData(url)
  }, [url])

  function handleScrollPercentage(){
    
    const scroll = document.body.scrollTop || document.documentElement.scrollTop
    
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    setScrollPercentage((scroll / height)*100);
    console.log(scrollPercentage);
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScrollPercentage)

    return ()=> {
        window.removeEventListener('scroll', ()=>{})
    }
  })

  if(errorMessage){
    return <div>{errorMessage}</div>
  }

  if (loading){
    return <div>Loading data! Please Wait</div>
  }

  return (
    <div>
        <div id={styles.topContainer}>
         <h1>Custom scroll indicator</h1>
            <div id={styles.progressBar} style={{width: `${scrollPercentage}%`}}></div>

        </div>
        <div id={styles.dataContainer}>
            {
                data && data.length > 0 ?
                data.map(dataItem =>(
                    <p>{dataItem.title}</p>
                ))
                : null
            }
        </div>
      
    </div>
  )
}
