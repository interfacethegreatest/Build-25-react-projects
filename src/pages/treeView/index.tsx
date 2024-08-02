import React from 'react';
import style from "./style.module.css";
import data from "./data";
import MenuList from "./MenuList";  // Correct import with capitalized first letter

export default function Index() {
    const test = [1,2,3,5,6]
    console.log(test)
    console.log(...test)
    return (

        <div>
            {
                data && data.length > 0 ?
                <MenuList list={data} />
                :
                null

            }
        </div>
       
    );
}
