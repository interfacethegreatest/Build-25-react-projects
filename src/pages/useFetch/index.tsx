import React, { useEffect, useState } from 'react';
import fetchHook from './fetchHook';

export default function Index() {
  const { data, error, pending } = fetchHook("https://dummyjson.com/products", {});

  console.log({ data, error, pending });

  return (
    <div>
      <h1>Use Fetch Hook</h1>
      {
        pending ? <h2>Pending! Please wait</h2> : null
      }
      {
        error ? <h2>Error: {error}</h2> : null
      }
      {
        data && data.products && data.products.length > 0 ? (
          <div>
            <h2>Products</h2>
            <ul>
              {data.products.map((product: any, index: number) => (
                <li key={index}>
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null
      }
    </div>
  );
}
