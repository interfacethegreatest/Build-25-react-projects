import React, { useEffect, useState } from 'react';
import styles from "./loadMore.module.css";
import data from '../accordion/data';

export default function Index() {

    const [images, setImages] = useState([]);
    const [countImages, setImageCount] = useState(5);
    const [countGridRow, setGridRows] = useState(1);

    async function fetchProducts(url: string) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setImages(data.products);
            console.log(data.products[0].images[0]);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log('123');
        fetchProducts('https://dummyjson.com/products?limit=20');
    }, []);  // Add dependency array here to run the effect only once

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <br />
            <br />
            <h1 style={{ textAlign: "center" }}>Images, click to load more.</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: `repeat(${countGridRow}, 1fr)`, gap: "10px", width: "100%", alignItems: "center", justifyContent: "center" }}>
                {
                    images && images.length ?
                        images.slice(0, countImages).map((image, index) => (
                            <img key={index} style={{ width: "100%", height: "auto", objectFit: "cover", border: "1px solid black" }} src={image.images[0]} alt={image.images[0]} />
                        ))
                        :
                        <h1>Images not found!</h1>
                }
            </div>
            <button style={{ display: "block", margin: "20px auto" }} onClick={() => {
                const newCount = countImages + 5;
                setImageCount(newCount);
                const newRows = countGridRow + 1;
                setGridRows(newRows);
            }}>Load more</button>
        </div>
    );
}
