contract;

mod data_structures;
mod errors;

use data_structures::{Pool, PoolBalance};
use errors::{InputError};

use std::{
    block::height,
    call_frames::{
        contract_id,
        msg_asset_id,
    },
    context::{
        balance_of,
        msg_amount,
    },
        token::transfer,

};

storage {
    initialized: bool = false,
    pool_id: u64 = 0,
    pools: StorageMap<u64, Pool> = StorageMap {},
    pool_balance: StorageMap<u64, PoolBalance> = StorageMap {},
}

abi MyContract {
    #[storage(read, write)]
    fn create_pool(asset_address: AssetId, buying_asset: AssetId, rate: u8, soft_cap: u64, hard_cap: u64, minimum_buy: u64, maximum_nuy: u64, strat_block: u64, end_block: u64) -> u64;
    #[storage(read, write)]
    fn buy(pool_id: u64, amount: u64);
    #[storage(read, write)]
    fn withdraw_balance(pool_id: u64);
}

impl MyContract for Contract {
    #[storage(read, write)]
    fn create_pool(
        asset_address: AssetId,
        buying_asset: AssetId,
        rate: u8,
        soft_cap: u64,
        hard_cap: u64,
        minimum_buy: u64,
        maximum_buy: u64,
        strat_block: u64,
        end_block: u64,
    ) -> u64 {
        require(rate > 0, InputError::RateCannotBeZero);
        require(soft_cap > 0, InputError::SoftCapCannotBeZero);
        require(hard_cap > soft_cap, InputError::HardCapCannotBeLessThanSoftCap);
        require(minimum_buy > 0, InputError::MinimumBuyCannotBeZero);
        require(maximum_buy > minimum_buy, InputError::MaximumBuyCannotBeLessThanMinimumBuy);
        require(strat_block > height(), InputError::StartBlockCannotBeLessThanCurrentBlock); // should
        require(end_block > strat_block, InputError::EndBlockCannotBeLessThanStartBlock);

        require(msg_amount() == hard_cap, InputError::IncorrectAmountProvided);
        require(msg_asset_id() == asset_address, InputError::IncorrectAssetProvided);

        let pool = Pool::new(msg_sender().unwrap(), buying_asset, asset_address, rate, soft_cap, hard_cap, minimum_buy, maximum_buy, strat_block, end_block);
        let pool_id = storage.pool_id.read();
        let pool_balance = PoolBalance::new(hard_cap, 0);
        storage.pool_balance.insert(pool_id, pool_balance);
        storage.pools.insert(pool_id, pool);
        storage.pool_id.write(pool_id + 1);
        pool_id
    }

    #[storage(read, write)]
    fn buy(pool_id: u64, amount: u64) {
        let pool_data = storage.pools.get(pool_id).try_read();
        require(pool_data.is_some(), InputError::PoolDoesNotExist);
        let pool = pool_data.unwrap();
        require(amount >= pool.minimum_buy, InputError::MaximumBuyCannotBeLessThanMinimumBuy);
        require(amount <= pool.maximum_buy, InputError::MaximumBuyCannotBeLessThanMinimumBuy);
        require(height() < pool.end_block, InputError::MaximumBuyCannotBeLessThanMinimumBuy);

        let mut balance = storage.pool_balance.get(pool_id).read();
        let tokens = amount*pool.rate;
        require(amount < tokens, InputError::NotEnoughTokensToBuy);
        transfer(tokens, pool.asset_address, msg_sender().unwrap());
        balance.selling_asset - tokens;
        balance.buying_asset + amount;
        storage.pool_balance.insert(pool_id, balance);
    }

    #[storage(read, write)]
    fn withdraw_balance(pool_id: u64) {
        let pool_data = storage.pools.get(pool_id).try_read();
        require(pool_data.is_some(), InputError::PoolDoesNotExist);
        let pool = pool_data.unwrap();

        let sender = msg_sender().unwrap();
        require(sender == pool.creator, InputError::IncorrectAmountProvided);

        let mut balance = storage.pool_balance.get(pool_id).read();
        transfer(balance.selling_asset, pool.asset_address, sender);
        balance.selling_asset = 0;
        storage.pool_balance.insert(pool_id, balance);
    }
}
