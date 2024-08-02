import React, { useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { IoMdClose } from 'react-icons/io'
import { IoCloseSharp } from 'react-icons/io5'


export default function index() {

  const [showModalDialogue, setShowModal] = useState(false)

  function showModal(){

    setShowModal(!showModalDialogue)

  }
  return (
    <div>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <h1 style={{textAlign:"center"}}>Modal component</h1>
        <button onClick={()=> showModal()}> Open modal component,</button>
        </div>
        <br />
        <br />
        <p style={{textAlign:"center"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores at, nostrum labore et suscipit asperiores recusandae ad ipsa, inventore, doloribus debitis rem ducimus laudantium quod sed? Autem quae non sequi.
        Blanditiis voluptas, amet tempora dolores illum officia at autem odio accusamus deserunt eum. Nulla sunt doloribus dolor quae repudiandae veritatis eaque soluta ab, officiis sed magnam quas id, nemo quasi?
        Rem aliquam, minima recusandae repellendus magni dolores accusamus quisquam cum iste, molestiae pariatur, tempore explicabo quo nostrum officiis? Officia hic esse repudiandae facilis omnis quo dignissimos et quisquam in inventore!</p>
        <div id={styles.modalBackground} style={ showModalDialogue ? {display:"grid"} : {display:"none"}}>
        <div id={styles.modal}>
          <div onClick={()=>showModal()} id={styles.modalHeader}>
            <h1 style={{margin:"0", textAlign:"center"}}>This is a modal header.</h1>
            <a onClick={()=>showModal()} id={styles.close}><IoCloseSharp/></a>
            </div>
          <div id={styles.modalBody}>
            <h2 style={{marginTop:"2px", marginBottom:"10px", position:"absolute", top:0}}>This is a modal body</h2>
            <br />
            <br />
            <p style={{margin:"20px 5px", marginBottom:"10px" , textAlign:"center"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati cupiditate amet illo voluptates magnam quasi. Architecto libero quos facere aliquam iusto autem ex, impedit, porro dicta quas molestiae non quibusdam!
            Non, voluptatibus vel cupiditate perspiciatis ratione placeat consequuntur quasi sed a temporibus, eum, dolore atque ab laboriosam!</p>
            <br />
            <br />
          </div>
          <div id={styles.modalFooter}>
            <h3 style={{margin:0, textAlign:"center"}}>This is a footer.</h3>
            <div id={styles.buttonDiv}>
              <button style={{backgroundColor:"red", borderRadius:"5px", marginRight:"5px"}}>No</button>
              <button style={{backgroundColor:"green", borderRadius:"5px"}}>Yes</button>
            </div>
          </div>
        </div>
        </div>
      
    </div>
  )
}
