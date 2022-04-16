# casperchess-single


You can check it out at http://casperchess.hotchocolate.finance
(however the site is not yet whitelisted on casper signer, to interact with the signer download the signer from git hub, modify the manifest to add http://casperchess.hotchocolate.finance and then install the signer under development mode)

Or run it locally:

	To run the program:

		clone the repo
		cd app
		run npm install
		run nodemon server.js
		run serve -s build

	Frontend server will start on localhost:3000
	backend server will start on localhost:6100
	make sure to run the server and build in seperate terminals!
  
 #The Contract
  
   You can view the contract live on testnet.cspr.live here : https://testnet.cspr.live/contract/6f978f1bd5d7071d464fa3c4fe72f5c4d7aedbad6b558402ccf5d7aecbfd915b
    
   How it works:
    
   The contract by default has 1 named key, the players_dict (players dictionary). This stores any player that uploads their score in a new dictionary       created by the contract and named as the players account hash. Then, under the player_uref (the newly created dictionary named as the account hash)       four new keys are stored: total_games, wins, losses, and stalemates. 
      
#The Game
 
 Chess is older than dirt so i'm going to assume you understand how it works. However instructions on the home page will inform those not in the know.
    As for the blockchain aspect of it, When a player plays the game and wins, loses, are falls into draw/stalemate, the total games are incremented
    along with the respective game-over condition. When the player likes, they can save their score to the smart contract.
    
  the scores are displayed so: ```Smart contract number + session number``` where 'smart contract number' is the value stored in the respective key on     chain,either total_games, wins, losses, or stalemates. 'Session number' is the number that is stored in the browser and will be used by the deploy
  builder to increment your smart contract value. It does this by simply taking you smart contract value + session value for each respective key.
              
              


	
	
