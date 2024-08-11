import React, { MutableRefObject, useRef } from 'react'
import styles from './styles.module.css'

export default function Index() {
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const ref3 = useRef<HTMLDivElement>(null);
  const ref4 = useRef<HTMLDivElement>(null);
  const ref5 = useRef<HTMLDivElement>(null);
  const ref6 = useRef<HTMLDivElement>(null);

  return (
    <div id={styles.container}>
      <h1 style={{textAlign:"center", color:"black"}}> Welcome to Scroll to div!</h1>
      <div id={styles.buttonDiv}>
        <button onClick={() => ref1.current?.scrollIntoView({ behavior: "smooth" })}>Scroll to div 1</button>
        <button onClick={() => ref2.current?.scrollIntoView({ behavior: "smooth" })}>Scroll to div 2</button>
        <button onClick={() => ref3.current?.scrollIntoView({ behavior: "smooth" })}>Scroll to div 3</button>
        <button onClick={() => ref4.current?.scrollIntoView({ behavior: "smooth" })}>Scroll to div 4</button>
        <button onClick={() => ref5.current?.scrollIntoView({ behavior: "smooth" })}>Scroll to div 5</button>
        <button onClick={() => ref6.current?.scrollIntoView({ behavior: "smooth" })}>Scroll to div 6</button>
      </div>
      
      <div ref={ref1} id={styles.colourDiv} style={{ backgroundColor: "red" }}><h1 style={{textAlign:"center"}}>Div 1</h1></div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><button onClick={() => window.scrollTo(0, 0)}>Scroll to top</button></div>
      <div ref={ref2} id={styles.colourDiv} style={{ backgroundColor: "green" }}><h1 style={{textAlign:"center"}}>Div 2</h1></div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><button onClick={() => window.scrollTo(0, 0)}>Scroll to top</button></div>
      <div ref={ref3} id={styles.colourDiv} style={{ backgroundColor: "blue" }}><h1 style={{textAlign:"center"}}>Div 3</h1></div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><button onClick={() => window.scrollTo(0, 0)}>Scroll to top</button></div>
      <div ref={ref4} id={styles.colourDiv} style={{ backgroundColor: "purple" }}><h1 style={{textAlign:"center"}}>Div 4</h1></div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><button onClick={() => window.scrollTo(0, 0)}>Scroll to top</button></div>
      <div ref={ref5} id={styles.colourDiv} style={{ backgroundColor: "grey" }}><h1 style={{textAlign:"center"}}>Div 5</h1></div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><button onClick={() => window.scrollTo(0, 0)}>Scroll to top</button></div>
      <div ref={ref6} id={styles.colourDiv} style={{ backgroundColor: "yellow" }}><h1 style={{textAlign:"center"}}>Div 6</h1></div>
      <div style={{display:"flex", justifyContent:"center", marginTop:"10px"}}><button onClick={() => window.scrollTo(0, 0)}>Scroll to top</button></div>
    </div>
  )
}
