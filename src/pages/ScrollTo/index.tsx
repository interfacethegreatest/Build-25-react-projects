import React, { useEffect, useState } from 'react';
import styles from './style.module.css';

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [locations, setLocations] = useState({
    start: 0,
    end: 0,
  });
  const [errorMessage, setErrorMessage] = useState('');

  async function loadData(url : string) {
    try {
      setLoading(true);
      const response = await fetch(url);
      const loadedData = await response.json();
      if (loadedData && loadedData.products.length > 0) {
        setData(loadedData);
      } else {
        setData({ products: [] });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  }

  useEffect(() => {
    loadData('https://dummyjson.com/products');
    setLocations({
        start : 0,
        end : document.body.scrollHeight
    })
  }, []);

  if (loading) {
    return <h1>LOADING ...</h1>;
  }

  if (errorMessage) {
    return <h1>Error! {errorMessage}</h1>;
  }
  return (
    <div id={styles.container}>
      <h1>Welcome to Scroll to top and bottom</h1>
      <button onClick={()=>window.scrollTo(locations.start,locations.end)}>Scroll to bottom</button>
      <div id={styles.data}>
        <ul>
          {data && data.products.length > 0 ? (
            data.products.map((product) => (
              <>
              <li id={styles.productTitle} key={product.id}>{product.title}</li>
              <br />
              </>
            ))
          ) : (
            <p>No products available</p>
          )}
        </ul>
        <button onClick={()=>window.scrollTo(locations.start, locations.start)}>Scroll to start</button>
      </div>
    </div>
  );
}
