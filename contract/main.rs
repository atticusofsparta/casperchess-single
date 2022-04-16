#![no_std]
#![no_main]
// We need to explicitly import the std alloc crate and `alloc::string::String` as we're in a
// `no_std` environment.
extern crate alloc;

use alloc::string::String;
use alloc::string::ToString;
use alloc::vec::Vec;
use alloc::{vec};

use casper_contract::contract_api::{
    runtime::{self, get_caller}, 
    storage::{self, dictionary_get, dictionary_put}
};
use casper_types::{URef, U512,
     CLType, CLTyped, EntryPoint, EntryPointAccess, EntryPointType, EntryPoints, Parameter};

#[no_mangle]
pub extern "C" fn add_game(){

        //check if player exists and create a dict if player doesnt exist.
    let mut player_uref = match runtime::get_key(&get_caller().to_string()){
        Some(uref_key) => uref_key.into_uref().unwrap(),
        None => storage::new_dictionary(&get_caller().to_string()).unwrap()
    };

    storage::dictionary_put(player_uref, "total_games", U512::from_dec_str("0").unwrap());
    storage::dictionary_put(player_uref, "wins", U512::from_dec_str("0").unwrap());
    storage::dictionary_put(player_uref, "losses", U512::from_dec_str("0").unwrap());
    storage::dictionary_put(player_uref, "stalemates", U512::from_dec_str("0").unwrap());

    let mut players = match runtime::get_key("players_dict") {
        Some(uref_key) => uref_key.into_uref().unwrap(),
        None => storage::new_dictionary("players_dict").unwrap(),
    };
    storage::dictionary_put(players, &get_caller().to_string(), player_uref );

     

    let mut player_uref: URef = storage::dictionary_get(players, &get_caller().to_string()).unwrap().unwrap();
    let mut total_games: U512 = storage::dictionary_get(player_uref, "total_games").unwrap().unwrap();
    let mut wins: U512 = storage::dictionary_get(player_uref, "wins").unwrap().unwrap();
    let mut losses: U512 = storage::dictionary_get(player_uref, "losses").unwrap().unwrap();
    let mut stalemates: U512 = storage::dictionary_get(player_uref, "stalemates").unwrap().unwrap();

    //entry point params - overwrites games, wins, losses, stalemates, and pushes new history
    //fails if the new value is less than old value
    //dapp reads contract before deploying to check old values and generate the new values
    let new_total_games: U512 = runtime::get_named_arg("new_total_games");
        if new_total_games > dictionary_get::<U512>(player_uref, "total_games").unwrap().unwrap()
            {dictionary_put(player_uref, "total_games", new_total_games)};

    let new_wins: U512 = runtime::get_named_arg("new_wins");
        if new_wins > dictionary_get::<U512>(player_uref, "wins").unwrap().unwrap()
            {dictionary_put(player_uref, "wins", new_wins)};

    let new_losses: U512 = runtime::get_named_arg("new_losses");
        if new_losses > dictionary_get::<U512>(player_uref, "losses").unwrap().unwrap()
            {dictionary_put(player_uref, "losses", new_losses)};
     
    let new_stalemates: U512 = runtime::get_named_arg("new_stalemates");
        if new_stalemates > dictionary_get::<U512>(player_uref, "stalemates").unwrap().unwrap()
            {dictionary_put(player_uref, "stalemates", new_stalemates)}

}

#[no_mangle]
pub extern "C" fn call() {
    let mut entry_points = EntryPoints::new();
    entry_points.add_entry_point(EntryPoint::new(
        "add_game",
        vec![
            Parameter::new("new_total_games", U512::cl_type()),
            Parameter::new("new_wins", U512::cl_type()),
            Parameter::new("new_losses", U512::cl_type()),
            Parameter::new("new_stalemates", U512::cl_type()),
            ],
        CLType::Unit,
        EntryPointAccess::Public,
        EntryPointType::Contract,
    ));
    let (contract_hash, _version) = storage::new_contract(
        entry_points,
        None,
        Some("contract_package_hash".to_string()),
        Some("access_token".to_string()),
    );
    runtime::put_key("singleplayer_contract", contract_hash.into());
    runtime::put_key("singleplayer_contract_wrapped", storage::new_uref(contract_hash).into());
}