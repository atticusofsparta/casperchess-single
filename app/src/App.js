import {CasperClient, CasperServiceByJsonRPC, CLPublicKey, CLValueBuilder, isConnected, Signer, Contracts} from "casper-js-sdk";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import './style.css';
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import Game from './pages/Game';
import Layout from './pages/Layout';
import axios from "axios";
//import win/loss state from game


const apiUrl = "http://localhost:6100/api";
const casperService = new CasperServiceByJsonRPC(apiUrl);
const casperClient = new CasperClient(apiUrl);
const client = new CasperClient(apiUrl);
const contract = new Contracts.Contract(client);



function App() {

  //gets game result from Game, sets result in score to increment session game details
  const [score, setScore] = useState("");
  const gametoapp = (gameResult) => {
    if (gameResult === "win"){setScore("win")}
    if (gameResult === "loss"){setScore("loss")}
    if (gameResult === "stalemate"){setScore("stalemate")}
    console.log("gameResult", gameResult)

  }

 //connected account details
  const [balance, setBalance] = useState("?");
  const [address, setAddress] = useState("?");

//account game detals
  const [total_games, setTotal_Games] = useState("?");
  const [wins, setWins] = useState("?");
  const [losses, setLosses] = useState("?");
  const [stalemates, setStalemates] = useState("?");

//session game details
  const [sessionGames, setSessionGames] = useState(0)
  const [sessionWins, setSessionWins] = useState(0)
  const [sessionLosses, setSessionLosses] = useState(0)
  const [sessionStalemates, setSessionStalemates] = useState(0)

  useEffect(()=>{
    
    if (score === "win"){console.log("im here")}
    if (score === "loss"){setSessionLosses(sessionLosses+1)}
    if (score === "stalemate"){setSessionStalemates(sessionStalemates+1)}
    if (score === "win" || "loss" || "stalemate"){setSessionGames(sessionGames+1)}
    console.log("I did it")
    
  },[score])

//set html values
  useEffect(()=>{ 
    const textAddress = document.getElementById('textAddress');
    const textBalance = document.getElementById('textBalance');
    const textTotal_Games = document.getElementById('textTotal_Games');
    const textWins = document.getElementById('textWins');
    const textLosses = document.getElementById('textLosses');
    const textStalemates = document.getElementById('textStalemates');
    textAddress.textContent = `Connected account: ${address.replace(address.slice(5, 61), ' . . . ')}`;
    textBalance.textContent = `CSPR Balance: ${balance / 1000000000}`;
    textTotal_Games.textContent = `Total Games: ${total_games}` + ` + ${sessionGames}`;
    textWins.textContent = `Wins: ${wins}` + ` + ${sessionWins}`;
    textLosses.textContent = `Losses: ${losses}` + ` + ${sessionLosses}`;
    textStalemates.textContent = `Stalemates: ${stalemates}` + ` + ${sessionStalemates}`;
  },[address, balance, total_games, wins, losses, stalemates, sessionGames, sessionWins, sessionLosses, sessionStalemates])
 

  //get  account data from server
  useEffect(()=>{
    async function AccountInfo(){
      const publicKey = await window.casperlabsHelper.getActivePublicKey();
            setAddress(publicKey);
           axios.post('http://localhost:6100/balance', {"publicKey": publicKey}).then((response) => {
             const bal = response.data;
             setBalance(bal)
             console.log(bal)
           }
           )
           axios.get('http://localhost:6100/get_total_games', {params: {
            publicKey: publicKey}}).then((response) => {
              setTotal_Games(parseInt(response.data.hex, 16));            
           }
           )
           axios.get('http://localhost:6100/get_wins', {params: {
            publicKey: publicKey}}).then((response) => {
              setWins(parseInt(response.data.hex, 16));            
           }
           )
           axios.get('http://localhost:6100/get_losses', {params: {
            publicKey: publicKey}}).then((response) => {
              setLosses(parseInt(response.data.hex, 16));            
           }
           )
           axios.get('http://localhost:6100/get_stalemates', {params: {
            publicKey: publicKey}}).then((response) => {
              setStalemates(parseInt(response.data.hex, 16));            
           }
            )


          }
    var accountinfoint = setInterval(AccountInfo, 10000)
    return accountinfoint;
  },[])

  //connect button
  async function connect(){
    try{Signer.sendConnectionRequest().then(console.log('connect'))
    
  } catch(error){console.log(error)}
    
  }
  //disconnect button
  async function disconnect(){
    try{Signer.disconnectFromSite().then(console.log('disconnect'));} catch(error){console.log(error)}
  }
//save button
  async function deploy() {
    

    
  }
  //   if (activeKey == null) { //Need to be connected to the Signer to continue
  //     alert("Please unlock the signer to continue");
  //     return;
  //   }
    
  //   const args = RuntimeArgs.fromMap({ //Need to build a UInt512 CLValue and package into RuntimeArgs
  //      "total_games": CLValueBuilder.u512(total_games),
  //      "wins": CLValueBuilder.u512(total_games),
  //      "losses": CLValueBuilder.u512(total_games),
  //      "stalemates": CLValueBuilder.u512(total_games),
  //      "history": CLValueBuilder.u512(history)
  //     }); 
      
  //   const pubkey = CLPublicKey.fromHex(activeKey); //Build CLPublicKey from hex representation of public key
  //   contract.setContractHash(singleplayer_contract); //Sets the contract hash of the Contract instance. The hash of our highscore contract
  //   const result = contract.callEntrypoint("add_game", args, pubkey, "casper-test", csprToMotes(1).toString(), [], 10000000); //Builds a Deploy object at add_highscore entrypoint
  //   const deployJSON = DeployUtil.deployToJson(result);
  //   Signer.sign(deployJSON, activeKey).then((success) => { //Initiates sign request
  //     sendDeploy(success);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

//render page
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/Home">Casper Chess</a>
   
      <ul className="navbar-nav me-auto">
        <Layout />
       <li className="nav-item">
          <a className="nav-link" id="connectBtn" onClick={connect} >Connect</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="deployBtn" onClick={deploy} >Save</a>
        </li>
      </ul>
      <ul >  
         <li id="textAddress">Connected account: </li>
                  <li id="textBalance">CSPR Balance: </li>
                </ul>
                <ul>
                <li id="textTotal_Games">Total Games: </li>
                <li id="textWins">Wins: </li>
                </ul>
                <ul>
                <li id="textLosses">Losses: </li>
                <li id="textStalemates">Stalemates: </li>
                </ul>
                
               
              
  </div>
  
</nav>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<Home />} />
        <Route path="/Game" element={<Game gametoapp={gametoapp}/>} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      <Outlet />
      </div>
    

  );
}

export default App;