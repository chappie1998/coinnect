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
    StartBlockCannotBeLessThanCurrentBlock: (),
    EndBlockCannotBeLessThanStartBlock: (),
    IncorrectAmountProvided: (),
    IncorrectAssetProvided: (),
    PoolDoesNotExist: (),
    NotEnoughTokensToBuy: (),
}
