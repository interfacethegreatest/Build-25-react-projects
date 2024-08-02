import React, { useState } from 'react'
import styles from "./tabs.module.css"


export default function index({tabsContent, onChange}) {
 
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  function handleOnClick(getCurrentIndex){

    setCurrentTabIndex(getCurrentIndex);
    onChange(getCurrentIndex);

  }

  return (
    <div id ={styles.wrapper}>
        <div id={styles.heading}>
            {
                tabsContent.map((tabItem, index)=> (
                    <div id={currentTabIndex === index ? styles.active : styles.tabItem} onClick={()=> handleOnClick(index)} key={tabItem.label}>
                        <span id={styles.label}>{tabItem.label}</span>
                    </div>
                ))
            }
            
        </div>
        <div id={styles.content}>
            {
                tabsContent[currentTabIndex] && tabsContent[currentTabIndex].content
            }


        </div>
      
    </div>
  )
}
