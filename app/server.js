const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

//middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const contracthash = "hash-6f978f1bd5d7071d464fa3c4fe72f5c4d7aedbad6b558402ccf5d7aecbfd915b";
const { CasperServiceByJsonRPC,DeployUtil,CLPublicKey,Contracts,CasperClient} = require("casper-js-sdk");
const client = new CasperServiceByJsonRPC("http://95.216.67.162:7777/rpc");
const deployclient = new CasperClient("http://95.216.67.162:7777/rpc");
const contract = new Contracts.Contract(client);
contract.setContractHash(contracthash);

//send deploy to smart contract
app.post('/sendDeploy', (req, res) => {
    const signedJSON = req.body; //Get JSON from POST body
    let signedDeploy = DeployUtil.deployFromJson(signedJSON).unwrap(); //Unwrap from JSON to Deploy object
    signedDeploy.send("http://95.216.67.162:7777/rpc").then((response) => { //Send Signed Deploy
      res.send(response); //Send this back to the frontend
    }).catch((error) => {
      console.log(error);
      return;
    });
  });
  //checks deploys status
  app.get("/getDeploy", (req, res) => {
    const hash = req.query.hash;
    deployclient.getDeploy(hash).then((response) => { //Calls getDeploy on the client with the deploy hash. Responds with current deploy status
      res.send(response[1].execution_results); //Send this back to the frontend
      return;
    }).catch((error) => {
      res.send(error);
      return;
    })
  });

   //account balance from the last block
app.post("/balance", async (req, res) => {
  let { publicKey } = req.body;
  console.log(publicKey, "is Connected")
  const latestBlock = await client.getLatestBlockInfo();
  const root = await client.getStateRootHash(latestBlock.block.hash);
  const balanceUref = await client.getAccountBalanceUrefByPublicKey(root,CLPublicKey.fromHex(publicKey))
  const balance = await client.getAccountBalance(latestBlock.block.header.state_root_hash,balanceUref);
    res.status(200).send(balance.toString());
});

//gets connected account info from contract
app.get("/get_total_games", async (req, res) => {
    const publicKey = req.query.publicKey;
    console.log(CLPublicKey.fromHex(publicKey).toAccountHashStr());
    const latestBlock = await client.getLatestBlockInfo();
    const root = await client.getStateRootHash(latestBlock.block.hash);
    await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "total_games").then((response) => {
    res.send(response.CLValue.data)}
     )
})

app.get("/get_wins", async (req, res) => {
    const publicKey = req.query.publicKey;
    console.log(CLPublicKey.fromHex(publicKey).toAccountHashStr());
    const latestBlock = await client.getLatestBlockInfo();
    const root = await client.getStateRootHash(latestBlock.block.hash);
    await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "wins").then((response) => {
    res.send(response.CLValue.data)}
     )
})
app.get("/get_losses", async (req, res) => {
    const publicKey = req.query.publicKey;
    console.log(CLPublicKey.fromHex(publicKey).toAccountHashStr());
    const latestBlock = await client.getLatestBlockInfo();
    const root = await client.getStateRootHash(latestBlock.block.hash);
    await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "losses").then((response) => {
    res.send(response.CLValue.data)}
     )
})
app.get("/get_stalemates", async (req, res) => {
    const publicKey = req.query.publicKey;
    console.log(CLPublicKey.fromHex(publicKey).toAccountHashStr());
    const latestBlock = await client.getLatestBlockInfo();
    const root = await client.getStateRootHash(latestBlock.block.hash);
    await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "stalemates").then((response) => {
    res.send(response.CLValue.data)}
     )
})



app.listen(6100, () => console.log("running on port 6100..."));

