contract;

struct Pool {
    rate: u8,
    asset_address: AssetId,
    soft_cap: u64,
    hard_cap: u64,
    minimum_buy: u64,
    maximum_nuy: u64,
    strat_block: u64,
    end_block: u64,
}

impl Pool {
    pub fn new(
        rate: u8,
        asset_address: AssetId,
        soft_cap: u64,
        hard_cap: u64,
        minimum_buy: u64,
        maximum_nuy: u64,
        strat_block: u64,
        end_block: u64,
    ) -> Self {
        Pool {
            rate
            asset_address
            soft_cap
            hard_cap
            minimum_buy
            maximum_nuy
            strat_block
            end_block
        }
    }
}


storage {
    initialized: bool = false,
    pool: u64 = 0,
    pools: StorageMap
}

abi MyContract {
    #[storage(read, write)]
    fn create_pool() -> bool;
}

impl MyContract for Contract {
    #[storage(read, write)]
    fn create_pool(address: b256, amount: u64) {
        let current_balance = storage.balances.get(address).try_read().unwrap_or(0);

        storage.balances.insert(address, current_balance + amount);
    }
}
