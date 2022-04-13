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
        </div>
      </div>
    </div>
  );
};

export default Home;