import { stringify } from 'querystring';
import React, { useState } from 'react';

function MenuList({ list = [] }) {
    const [showChild, setShowChild] = useState([]);

    function handleShow(label: string) {
        if (showChild.includes(label)) {
            setShowChild([...showChild.pop(label)]);
        } else {
            setShowChild([...showChild, label]);
        }
    }

    return (
        <div>
            {list && list.length > 0 ? (
                list.map((item, index) => (
                    <div key={index} style={{ marginLeft: "40px" }}>
                        <h1>{item.label}</h1>
                        <button onClick={() => handleShow(item.label)}>
                            {showChild.includes(item.label) ? "-" : "+"}
                        </button>
                        {item.children && showChild.includes(item.label) ? (
                            <MenuList list={item.children} />
                        ) : null}
                    </div>
                ))
            ) : null}
        </div>
    );
}

export default MenuList;
