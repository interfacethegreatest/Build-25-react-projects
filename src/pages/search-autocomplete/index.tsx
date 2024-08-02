import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { stringify } from 'querystring';

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState<Error | any>(null);
  const [subStrings, setSubStrings] = useState<string[]>([]);

  function getSubStrings(searched: string) {
    console.log(searched);
    const newSubStrings : string[] = [];
    users.forEach((user: string) => {
        if (user.toLowerCase().startsWith(searched.toLowerCase())) {
          newSubStrings.push(user);
          console.log(user);
        }
    });
      setSubStrings(newSubStrings)
    }

  async function fetchData() {
    try {
      const response = await fetch('https://dummyjson.com/users?page=1&limit=200');
      console.log(response);
      const data = await response.json();
      setLoading(false);
      console.log(data.users);
      setUsers(data.users.map((user : any) => user.firstName));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(subStrings); // Log users whenever it changes
  }, [subStrings]);

  if (loading) {
    return (
      <h1>Loading! Please wait...</h1>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{textAlign:"center"}}>Welcome to auto complete!</h1>
      <div id={styles.container}>
       <input onChange={(e) => getSubStrings(e.target.value)} type="text" />
       <ul>
        {subStrings.length > 0 && subStrings.length != users.length && subStrings.map((name, index) => (
          <ul key={index}>{name}</ul>
        ))}
       </ul>
      </div>
    </div>
  );
}
