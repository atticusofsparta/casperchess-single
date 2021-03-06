import React, {useEffect, useRef, useState } from 'react';
import Chess from 'chess.js';
import '../style.css';
import { Chessboard } from 'react-chessboard';
import PopUp from '../modules/modals/modal files/PopUp';
import AddModal from '../modules/modals/modal components/AddModal';
import CloseModal from '../modules/modals/modal components/CloseModal';
import Modal from '../modules/modals/modal components/Modal';
import ModalBody from '../modules/modals/modal components/ModalBody';
import ModalHeader from '../modules/modals/modal components/ModalHeader';
import ModalFooter from '../modules/modals/modal components/ModalFooter';


export default function Game({ gametoapp }, { boardWidth }) {
    const chessboardRef = useRef();
    const [game, setGame] = useState(new Chess());
    const [boardOrientation, setBoardOrientation] = useState('white');
    const [currentTimeout, setCurrentTimeout] = useState();

    //score logic
    const [win, setWin] = useState()
    const [stalemate, setStalemate] = useState()
    const [gameResult, setGameResult] = useState("")
 
    
    useEffect(()=>{
      //win/loss
      if (game.in_checkmate() === true) {
        let playerInCheckmate = game.turn()
        if (playerInCheckmate === "b") {
          setWin(true)
          console.log("white wins")
          
        }
        if (playerInCheckmate === "w") {
          setWin(false)
          console.log("black wins")
          
        }
  
        console.log(`${playerInCheckmate} in checkmate`)
      }
  //stalemate
      if (game.in_stalemate() | game.in_draw() === true) {

        setStalemate(true)
      
        console.log("in stalemate ", stalemate)
        
      }

    },[game])

    //send gameresult to app.js
    useEffect(()=>{
      if (win === true){setGameResult("win");AddModal(Won)}
      if (win === false){setGameResult("loss");AddModal(Lost)}
      if (stalemate === true){setGameResult("stalemate");AddModal(Draw)}
      if (gameResult === "" || "win" ||  gameResult ===  "loss" || gameResult === "stalemate") {gametoapp(gameResult)}
    },[game, win, stalemate, gameResult])
    
    
  
    function safeGameMutate(modify) {
      setGame((g) => {
        const update = { ...g };
        modify(update);
        return update;
      });
    }
  
    function makeRandomMove() {
      const possibleMoves = game.moves();
  
      // exit if the game is over
      if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;
  
      const randomIndex = Math.floor(Math.random() * possibleMoves.length);
      safeGameMutate((game) => {
        game.move(possibleMoves[randomIndex]);
      });
    }
  
    function onDrop(sourceSquare, targetSquare) {
      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });
      setGame(gameCopy);
  
      // illegal move
      if (move === null) return false;
  
      // store timeout so it can be cleared on undo/reset so computer doesn't execute move
      const newTimeout = setTimeout(makeRandomMove, 200);
      setCurrentTimeout(newTimeout);
      return true;
    }


   function modalClose(){
     CloseModal()
     
      safeGameMutate((game) => {
        game.reset();
         setGameResult("")
        setWin("")
        setStalemate("")
      });
      // stop any current timeouts
      clearTimeout(currentTimeout);
    
   }
    
    function Won(props) {
      return (
        <Modal>
          <ModalHeader>
            <h3>Congratulations!</h3>
          </ModalHeader>
          <ModalBody>
            <p>You Won!</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={ modalClose } className="btn btn-primary">OK</button>
          </ModalFooter>
        </Modal>
      );
    }

    function Lost(props) {
      return (
        <Modal>
          <ModalHeader>
            <h3>Better Luck Next Time</h3>
          </ModalHeader>
          <ModalBody>
            <p>You Lost</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={ modalClose } className="btn btn-primary">OK</button>
          </ModalFooter>
        </Modal>
      );
    }

    function Draw(props) {
      return (
        <Modal>
          <ModalHeader>
            <h3>So Close</h3>
          </ModalHeader>
          <ModalBody>
            <p>This game was a draw</p>
          </ModalBody>
          <ModalFooter>
            <button onClick={ modalClose } className="btn btn-primary">OK</button>
          </ModalFooter>
        </Modal>
      );
    }






    ////Move logger is rendered
  
    function FenLogger (){

     

        //initialize move content
        useEffect(()=>{
            
            const newMove = game.history()
            const parseMove = JSON.stringify(newMove)
            const logMove = parseMove
          if (null) { document.getElementById('fenlogger').innerHTML = 'Make a move...' }
        else {document.getElementById('fenlogger').innerHTML = logMove}
        
       },[])
       
         // returns json

        /**
         * [{ color: 'w', from: 'e2', to: 'e4', flags: 'b', piece: 'p', san: 'e4' }]
         */
       
        return (
            <div id="fenlogger"></div>
            
        )
    }

    //////chessborder is rendered

    return (
        <div id="gameContainer">
      <div id="boardContainer">
        <Chessboard
          id="myboard"
          animationDuration={200}
          boardOrientation={boardOrientation}
          boardWidth={boardWidth}
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: '4px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
          }}
          ref={chessboardRef}
        />
        <FenLogger />
        </div>
        <br/>
          <div id="boardBtnContainer"> <button id="boardBtn"
           className="rc-button"
           onClick={() => {
             safeGameMutate((game) => {
               game.reset();
               setGameResult("")
               setWin("")
               setStalemate("")
             });
             // stop any current timeouts
             clearTimeout(currentTimeout);
           }}
         >
           reset
         </button>

        <button id="boardBtn"
          className="rc-button"
          onClick={() => {
            safeGameMutate((game) => {
              game.undo();
            });
            // stop any current timeouts
            clearTimeout(currentTimeout);
          }}
        >
          undo
        </button></div>

      </div>
      
    );
  }
  /**
   *  
   */