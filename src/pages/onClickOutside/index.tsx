import React, { useRef, useState } from 'react'
import styles from './styles.module.css'
import outsideClick from './outsideClick';

export default function index() {
  const ref = useRef();
  outsideClick(ref, ()=>setShowContent(false))

  const [showContent, setShowContent] = useState(false)
  return (
    <div>
      {
        showContent ? <div ref={ref}>
            <h1>On Click outside custom hook</h1>
            <p>Please click outside of this to close this. It won't close if you click inside.</p>
        </div> : <button onClick={()=> setShowContent(true)}>Show Content</button>
      }
    </div>
  )
}
