import React, { useState } from 'react'
import styles from './tttstyles.module.css'
import { get } from 'http'
import { RiH1 } from 'react-icons/ri'

export default function index() {
  const [ board, setboardState ] = useState([0,0,0,0,0,0,0,0,0])
  const [ playerType, setNextType ] = useState('X')
  const [gameOver, setGameOver] = useState(false)

  function boxClick(location:number){
    if (gameOver) {

    }else {
    location-=1
    const getBoard = [...board]
    if (getBoard[location] > 1){
        return
    }
    var tile = playerType
    if( tile == 'X'){
     getBoard[location] = 2  
     tile = 'O'

    }else{
        getBoard[location] = 3
        tile = 'X'
    }
    console.log(getBoard[location])
    setNextType(tile)
    setboardState(getBoard)
    checkGameState(getBoard)
    }
}

function checkGameState(board : number[]){
    console.log(board)
    if (board[0] == 2 && board[1] == 2 && board[2] == 2){
        setGameOver(true)
    }
    if (board[3] == 2 && board[4] == 2 && board[5] == 2){
        setGameOver(true)
    }
    if (board[6] == 2 && board[7] == 2 && board[8] == 2){
        setGameOver(true)
    }
    if (board[0] == 3 && board[1] == 3 && board[2] == 3){
        setGameOver(true)
    }
    if (board[3] == 3 && board[4] == 3 && board[5] == 3){
        setGameOver(true)
    }
    if (board[6] == 3 && board[7] == 3 && board[8] == 3){
        setGameOver(true)
    }
    /*hr*/
    if (board[0] == 2 && board[3] == 2 && board[6] == 2){
        setGameOver(true)
    }
    if (board[1] == 2 && board[4] == 2 && board[7] == 2){
        setGameOver(true)
    }
    if (board[2] == 2 && board[5] == 2 && board[8] == 2){
        setGameOver(true)
    }
    if (board[0] == 3 && board[3] == 3 && board[6] == 3){
        setGameOver(true)
    }
    if (board[1] == 3 && board[4] == 3 && board[7] == 3){
        setGameOver(true)
    }
    if (board[2] == 3 && board[5] == 3 && board[8] == 3){
        setGameOver(true)
    }
    /*diag*/
    if (board[0] == 2 && board[4] == 2 && board[8] == 2){
        setGameOver(true)
    }
    if (board[0] == 3 && board[4] == 3 && board[8] == 3){
        setGameOver(true)
    }
    if (board[2] == 2 && board[4] == 2 && board[6] == 2){
        setGameOver(true)
    }
    if (board[2] == 3 && board[4] == 3 && board[6] == 3){
        setGameOver(true)
    }
    
}
return (
    <div>
        <h1 style={{textAlign:"center"}}> Welcome to Tic-Tac-Toe!</h1>
        <br />
        <p style={{textAlign:"center"}}> Select a grid to get started,</p>
        <div id={styles.tictactoe}>
            <div id={styles.square} onMouseDown={()=>boxClick(1)}>
                { board[0] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[0] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(2)}>
                { board[1] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[1] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(3)}>
                { board[2] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[2] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(4)}>
                { board[3] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[3] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(5)}>
                { board[4] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[4] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(6)}>
                { board[5] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[5] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(7)}>
                { board[6] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[6] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(8)}>
                { board[7] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[7] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
            <div id={styles.square} onMouseDown={()=>boxClick(9)}>
                { board[8] == 2 ? <h1 id={styles.clickedTile}>X</h1> : null }
                { board[8] == 3 ? <h1 id={styles.clickedTile}>O</h1> : null }
            </div>
        </div>
        {
            gameOver ? <h1 style={{textAlign:"center"}}>Player wins!</h1> : null
        }

      
    </div>
  )
}