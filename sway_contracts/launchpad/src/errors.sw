library;

pub enum InputError {
    AdminDoesNotExist: (),
    ApprovedDoesNotExist: (),
    NotEnoughTokensToMint: (),
    OwnerDoesNotExist: (),
    TokenDoesNotExist: (),
    TokenSupplyCannotBeZero: (),
    RateCannotBeZero: (),
    SoftCapCannotBeZero: (),
    HardCapCannotBeLessThanSoftCap: (),
    MinimumBuyCannotBeZero: (),
    MaximumBuyCannotBeLessThanMinimumBuy: (),
    BuyAmountCannotBeLessThanMinimumBuy: (),
    BuyAmountCannotBeGreaterThanMaximumBuy: (),
    StartBlockCannotBeLessThanCurrentBlock: (),
    EndBlockCannotBeLessThanStartBlock: (),
    IncorrectAmountProvided: (),
    IncorrectAssetProvided: (),
    PoolDoesNotExist: (),
    NotEnoughTokensToBuy: (),
    PoolExpired: (),
}
