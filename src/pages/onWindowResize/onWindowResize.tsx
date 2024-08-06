import { useLayoutEffect } from "react";
import { useState } from "react";

export default function onWindowResize(){
  const [divDimensions, setDivDimensions] = useState({ width: 0, height: 0 });
  function handleResize(){
    setDivDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }
  useLayoutEffect(()=>{
    handleResize()

    window.addEventListener("resize", handleResize);

    return()=>{
      window.removeEventListener("resize", handleResize)
    }

  },[]);

  return divDimensions;
}