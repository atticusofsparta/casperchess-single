import React from "react";
import "./Style.css";

const Home = () => {
  const wallet =
    "https://chrome.google.com/webstore/detail/casper-signer/djhndpllfiibmcdbnmaaahkhchcoijce";
  return (
    <div>
      <header>Welcome to Casper Chess</header>
      <h3>
        The only chess game that lets you save your win to the blockchain, so
        you can brag forever
      </h3>
      <div className="contentContainer">
        <div className="howItWorks">
          <div className="largeText">HOW IT WORKS:</div>
          <div>
            <ol>
              <li>
                Fund your wallet from the testnet <a href="https://testnet.cspr.live/tools/faucet">here.</a>
              </li>
              <li>Connect your Casper wallet by click the "connect" button above, the signer will prompt you to connect</li>
             <li>
                Go to the game tab and play a game against the computer. Once you win - or lose - your session score will go up. The session score is the second number in the score area, the first number is your saved score. When you are done playing, you can save to chain! You can play as many games as you want before saving, and saving is optional. If you dont save, and if you reload the page, you will lose your session score.
              </li>
              <li>
                To save to chain, click on the "save" button. You will be prompted to sign a transaction. Wait for your saved score to update. Once the score updates, your session score is saved to the blockchain. Good luck!
              </li>
            </ol>
          </div>
        </div>
        <div className="noCasper">
          <div className="largeText">Dont have a Casper account?</div>
          <div>
            Download the Casper Signer extension{" "}
            <a href={wallet} target="_blank" rel="noopener noreferrer" alt="">
              here
            </a>
          </div>
          <div>set a new password to create a Vault</div>
          <div>Then you can choose the "Create Account" option</div>
          <div>set your name and then choose "ED25519" as the Algorithm</div>
          <div>
            dont forget to download your secret key so you can recover your
            account if you forget your password
          </div>
        </div></div>
      
    
      <div className="chessRulesContainer">
        <div className="LargeText"> How to Play Chess</div>
        <div className="chessRules">
          <div className="pieces">
            <ul className="piecesList">
              <li>King: the king may move one square in any direction, 
                so long as no piece is blocking his path and the move 
                does not put the king in check.
              </li>
              <li>Queen: the queen may move any number of squares straight 
                or diagonally in any direction.
              </li>
              <li>Rook: sometimes called a Castle, the rook may move any 
                number of squares in a straight line, horizontally or vertically.
              </li>
              <li>Bishop: the bishop may move any number of squares diagonally</li>
              <li>Knight: the knight moves three squares total in an "L" shape. One 
                square horizontally or vertically and two squares in a direction 90 degrees to the 
                original direction. The knight "jumps" to its new position and is not 
                blocked by other pieces in its way.
              </li>
              <li>Pawn: pawns generally move only one square in the direction of your opponents side 
                of the board. On its first move from the starting position, the pawn can move two squares.
                While it can only move straight ahead, a pawn can only attack diagonally. So if 
                its path ahead is blocked, it cannot move.
              </li>
            </ul>
          </div>
          </div>
          </div>
          <br/>
          <div className="bottomContainer">
          <div className="specialMovesContainer">
            <div className="largeText">Special Moves</div>
            <div className="specialMoves">
              <ul>
                <li>EN PASSANT: if a pawn moves forward three squares, it is even with where 
                  the opponents pawn would be if it moved forward two squares. If the opposing 
                  pawn uses its initial two square move to become even with your pawn, you may 
                  attack the opponent diagonally and take the piece as if it had only moved 
                  one square.
                </li>
                <li>Castle: if there are no pieces between your king and either of your rooks, 
                  and neither piece has moved, you can move the king two squares towards the rook 
                  and move the rook one square on the opposite side of the king. You cannot castle 
                  into, out of, or through check.
                </li>
              </ul>
            </div>
          </div>
          <div className="objectiveContainer">
            <div className="largeText">Objectives and terms</div>
            <div className="objectives">
              <ul>
                <li>Check: if a king can be directly taken by an opponent's piece 
                  on the opponent's next turn, the king is in check. If your king is in check 
                  you must move your kinbg out of check or move another piece to block 
                  your opponent.
                </li>
                <li>CheckMate: if a king is in check and there is no possible move to get out 
                  of check, it is a checkmate and the game is over. Whomever is in checkmate 
                  loses.
                </li>
                <li>StaleMate: if a king is not in check, but there are no moves 
                  that can be made without placing itself in check, it is called a 
                  StaleMate and the game ends in a draw.
                </li>
              </ul>
            </div>
          </div>
          </div>
        
        
        
      
    </div>
  );
};

export default Home;