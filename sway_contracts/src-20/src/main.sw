contract;
use std::{
    call_frames::contract_id,
    constants::ZERO_B256,
    context::balance_of,
    token::mint_to_address,
    token::transfer,
};


struct Token {
    name: str[10],
    symbol: str[3],
    decimals: u8,
    total_supply: u64,
    owner: Address,
}

const INITIAL = Token {
    name: "          ",
    symbol: "   ",
    decimals: 9,
    total_supply: 0u64,
    owner: Address::from(ZERO_B256),
}

storage {
    initialized: bool = false,
    token: Token = INITIAL
}

abi FRC20 {
    #[storage(read, write)]
    fn constructor(name: str[10], symbol: str[3], decimals: u8,  supply: u64, recipient: Address);

    #[storage(read)]
    fn get_token() -> Token;
    #[storage(read)]
    fn total_supply() -> u64;
    #[storage(read)]
    fn decimals() -> u8;
    #[storage(read)]
    fn name() -> str[10];
    #[storage(read)]
    fn symbol() -> str[3];
    #[storage(read)]
    fn owner() -> Address;
    #[storage(read)]
    fn withdraw_balance(asset_id: AssetId, amount: u64);
}

impl FRC20 for Contract {
    #[storage(read, write)]
    fn constructor(name: str[10], symbol: str[3], decimals: u8,  supply: u64, recipient: Address) {
        assert(!storage.initialized.read());
        let token = Token {
            name: name,
            symbol: symbol,
            decimals: decimals,
            total_supply: supply,
            owner: recipient,

        };
        storage.initialized.write(true);
        storage.token.write(token);
        mint_to_address(supply, recipient);
    }

    #[storage(read)]
    fn get_token() -> Token {
        storage.token.read()
    }


    #[storage(read)]
    fn total_supply() -> u64 {
        storage.token.read().total_supply
    }
    #[storage(read)]
    fn decimals() -> u8 {
        storage.token.read().decimals
    }
    #[storage(read)]
    fn name() -> str[10] {
        storage.token.read().name
    }
    #[storage(read)]
    fn symbol() -> str[3] {
        storage.token.read().symbol
    }

    #[storage(read)]
    fn owner() -> Address {
        storage.token.read().owner
    }

    #[storage(read)]
    fn withdraw_balance(asset_id: AssetId, amount: u64) {
        assert(storage.initialized.read());
        let owner = Identity::Address(storage.token.read().owner);
        assert(amount < balance_of(asset_id, contract_id()));
        assert(msg_sender().unwrap() == owner);
        transfer(amount, asset_id, owner);
    }
}
