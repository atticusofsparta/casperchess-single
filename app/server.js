const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const contracthash = "hash-6f978f1bd5d7071d464fa3c4fe72f5c4d7aedbad6b558402ccf5d7aecbfd915b";
const { CasperServiceByJsonRPC,DeployUtil,EventStream,EventName,CLValueParsers,CLMap,CLValueBuilder,CLPublicKey, Contracts, CLValueBytesParsers } = require("casper-js-sdk");
const { response } = require("express");
const client = new CasperServiceByJsonRPC("http://95.216.67.162:7777/rpc");
const contract = new Contracts.Contract(client);
contract.setContractHash(contracthash);




app.post("/balance", async (req, res) => {
  
  let { publicKey } = req.body;
  console.log(publicKey, "is Connected")

  const latestBlock = await client.getLatestBlockInfo();
  const root = await client.getStateRootHash(latestBlock.block.hash);

  const balanceUref = await client.getAccountBalanceUrefByPublicKey(
      root, 
      CLPublicKey.fromHex(publicKey)
      )

  //account balance from the last block
  const balance = await client.getAccountBalance(
      latestBlock.block.header.state_root_hash,
      balanceUref
  );

    res.status(200).send(balance.toString());
});

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

// const wins = await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "wins");
    // const losses = await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "losses");
    // const stalemates = await client.getDictionaryItemByName(root,contracthash, CLPublicKey.fromHex(publicKey).toAccountHashStr().substring(13), "stalemates");
    // const result = Object.entries(total_games) + Object.entries(wins) + Object.entries(losses) + Object.entries(stalemates);
    // console.log("result is,", (result))

// export class CLU512 extends Numeric {
//     constructor(num: BigNumberish, originalBytes?: Uint8Array) {
//       super(512, false, num, originalBytes);
//     }

// {"CLValue":{"isCLValue":true,"originalBytes":{"0":1,"1":69},"bitSize":512,"signed":false,"data":{"type":"BigNumber","hex":"0x45"}}}