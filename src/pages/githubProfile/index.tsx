import React, { useEffect, useState } from 'react'
import styles from "./style.module.css"
import data from '../accordion/data';
import { truncate } from 'fs';

export default function githubProfileFinder() {

  const [userName, setUserName] = useState('interfacethegreatest')
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleSubmit() {
    fetchGithubUserData();
    
  }
  async function fetchGithubUserData(){
    const res = await fetch(`https://api.github.com/users/${userName}`)
    const data = await res.json();
    console.log(data);
    console.log(data.login);
    setLoading(false);
    setUserData(data);


  }

  useEffect(()=>{
    fetchGithubUserData();
  }, []);

  if (loading){
    return <h1 style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Loading...</h1>
  }

  return (
    <div id={styles.container}>
        <div id={styles.inputWrapper}>
            <input id={styles.search} onChange={(event)=> setUserName(event.target.value)} value={userName} type="test" name="search-by-username" placeholder='Search Github Username' />
            <button onClick={()=>handleSubmit()}>Search</button>
        </div>
        <br />
        <div id={styles.profileDesign}>
          <h1>{userData.login}</h1>
          <img id={styles.avatar} src={userData.avatar_url} alt={userData.avatar_url} />
          <h2>Following: {userData.following}</h2>
          <h2>Followers: {userData.followers}</h2>
          <h2>Created at: {userData.created_at.slice(0,10)}</h2>
          <h2>Name : {userData.name}</h2>
          <a href={userData.url}></a>


        </div>
      
    </div>
  )
}
