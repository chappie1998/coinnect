library;

pub struct PoolBalance {
    selling_asset: u64,
    buying_asset: u64,
}

impl PoolBalance {
    pub fn new(selling_asset: u64, buying_asset: u64) -> Self {
        PoolBalance {
            selling_asset,
            buying_asset,
        }
    }
}

pub struct Pool {
    creator: Identity,
    asset_address: AssetId,
    buying_asset: AssetId,
    rate: u8,
    soft_cap: u64,
    hard_cap: u64,
    minimum_buy: u64,
    maximum_buy: u64,
    strat_block: u64,
    end_block: u64,
}

impl Pool {
    pub fn new(
        creator: Identity,
        asset_address: AssetId,
        buying_asset: AssetId,
        rate: u8,
        soft_cap: u64,
        hard_cap: u64,
        minimum_buy: u64,
        maximum_buy: u64,
        strat_block: u64,
        end_block: u64,
    ) -> Self {
        Pool {
            creator,
            asset_address,
            buying_asset,
            rate,
            soft_cap,
            hard_cap,
            minimum_buy,
            maximum_buy,
            strat_block,
            end_block,
        }
    }
}
