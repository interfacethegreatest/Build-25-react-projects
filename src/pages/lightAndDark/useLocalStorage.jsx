import React, { useEffect, useState } from 'react'

export default function useLocalStorage(key, defaultValue) {
  
    const [value, setValue] = useState(()=>{
        let currentValue;

        try{
            currentValue = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue))
        }catch(error){
            console.log(error)
            currentValue = defaultValue;
        }
        return currentValue;
    });

    useEffect(()=>{
      localStorage.setItem(key, JSON.stringify(value));
    },[value])

    return [value, setValue];
}
