import React from 'react'
import styles from "./style.module.css"
import useLocalStorage from "./useLocalStorage";

export default function App() {

  const [theme, setTheme] = useLocalStorage('theme', "dark")

  function handleToggleTheme(){
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  console.log(theme)

  return (
    <div id={theme==='light' ? styles.lightBackground : styles.darkBackground}>
        <div style={{display:'flex', alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
            <p>Hello World</p>
            <button id={theme==='light' ? styles.buttonDark : styles.buttonLight} onClick={handleToggleTheme}>Change Theme</button>
        </div>
    </div>
  )
}
