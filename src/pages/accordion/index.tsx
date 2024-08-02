import React, { useState } from 'react'
import styles from "@/styles/Home.module.css"
import data from './data';
import { Span } from 'next/dist/trace';

export default function accordion() {

  const [selected, setSelected] = useState(Number);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false)
  const [multiple, setMultiple] = useState<number[]>([]);

  function expandText(id : number){
    console.log(id)
    setSelected(selected === id ? 0 : id);

  }

  function handleMultiSelection(id:number){
    let copyMultiple = [...multiple];
    const findIndex = copyMultiple.indexOf(id)
    if (findIndex === -1) {
      console.log(copyMultiple)
      copyMultiple.push(id)
      setMultiple(copyMultiple)
    } else{
      copyMultiple.splice(copyMultiple.indexOf(id),1)
      setMultiple(copyMultiple)
    }
    

  }

  return (
    <div id={styles.accordionMain}>
      <h1 style={{textAlign: 'center'}}>Accordion page</h1>
      { enableMultiSelection ? <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>Expand Multiple</button>
      :
      <button onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>
      Expand Single</button>
      }
      
      <div>
        { data && data.length > 0 ? 
        data.map((dataItem) =>(
          <div key={dataItem.id} id={styles.Questions}>
            <hr />
            <h3>{dataItem.question}</h3>
            <br />
            <a href="#" onClick={enableMultiSelection ? ()=>handleMultiSelection(parseInt(dataItem.id)) : ()=>expandText(parseInt(dataItem.id))}>
              {
              enableMultiSelection ?
              (
               multiple.includes(parseInt(dataItem.id)) ? <span>-</span>: <span>+</span>
              )
              :
              (
              selected === parseInt(dataItem.id) ? (<span>-</span>):(<span>+</span>)
              )
              }
            </a>
            {
             enableMultiSelection ? (
                multiple.includes(parseInt(dataItem.id)) ? (
                  <h4>{dataItem.answer}</h4>
                ) : null
              ) : (
                selected === parseInt(dataItem.id) ? <h4>{dataItem.answer}</h4> : null
              )
            }
            <br />
          </div>
        ))
        : <div> Data not found!</div> }
      </div>
    </div>
  )
}
