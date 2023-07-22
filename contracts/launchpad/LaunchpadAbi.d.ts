/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.39.1
  Forc version: 0.35.5
  Fuel-Core version: 0.17.3
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

import type { Option, Enum } from "./common";

export type IdentityInput = Enum<{ Address: AddressInput, ContractId: ContractIdInput }>;
export type IdentityOutput = Enum<{ Address: AddressOutput, ContractId: ContractIdOutput }>;
export type InputErrorInput = Enum<{ AdminDoesNotExist: [], ApprovedDoesNotExist: [], NotEnoughTokensToMint: [], OwnerDoesNotExist: [], TokenDoesNotExist: [], TokenSupplyCannotBeZero: [], RateCannotBeZero: [], SoftCapCannotBeZero: [], HardCapCannotBeLessThanSoftCap: [], MinimumBuyCannotBeZero: [], MaximumBuyCannotBeLessThanMinimumBuy: [], BuyAmountCannotBeLessThanMinimumBuy: [], BuyAmountCannotBeGreaterThanMaximumBuy: [], StartBlockCannotBeLessThanCurrentBlock: [], EndBlockCannotBeLessThanStartBlock: [], IncorrectAmountProvided: [], IncorrectAssetProvided: [], PoolDoesNotExist: [], NotEnoughTokensToBuy: [], PoolExpired: [] }>;
export type InputErrorOutput = InputErrorInput;

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type PoolInput = { creator: IdentityInput, asset_address: ContractIdInput, buying_asset: ContractIdInput, rate: BigNumberish, soft_cap: BigNumberish, hard_cap: BigNumberish, minimum_buy: BigNumberish, maximum_buy: BigNumberish, strat_block: BigNumberish, end_block: BigNumberish };
export type PoolOutput = { creator: IdentityOutput, asset_address: ContractIdOutput, buying_asset: ContractIdOutput, rate: number, soft_cap: BN, hard_cap: BN, minimum_buy: BN, maximum_buy: BN, strat_block: BN, end_block: BN };
export type PoolBalanceInput = { selling_asset: BigNumberish, buying_asset: BigNumberish };
export type PoolBalanceOutput = { selling_asset: BN, buying_asset: BN };

interface LaunchpadAbiInterface extends Interface {
  functions: {
    buy_token: FunctionFragment;
    create_pool: FunctionFragment;
    get_pool: FunctionFragment;
    get_pool_balance: FunctionFragment;
    withdraw_balance: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'buy_token', values: [BigNumberish, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'create_pool', values: [ContractIdInput, ContractIdInput, BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish, BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_pool', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'get_pool_balance', values: [BigNumberish]): Uint8Array;
  encodeFunctionData(functionFragment: 'withdraw_balance', values: [BigNumberish]): Uint8Array;

  decodeFunctionData(functionFragment: 'buy_token', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'create_pool', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_pool', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_pool_balance', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'withdraw_balance', data: BytesLike): DecodedValue;
}

export class LaunchpadAbi extends Contract {
  interface: LaunchpadAbiInterface;
  functions: {
    buy_token: InvokeFunction<[pool_id: BigNumberish, amount: BigNumberish], void>;
    create_pool: InvokeFunction<[asset_address: ContractIdInput, buying_asset: ContractIdInput, rate: BigNumberish, soft_cap: BigNumberish, hard_cap: BigNumberish, minimum_buy: BigNumberish, maximum_buy: BigNumberish, strat_block: BigNumberish, end_block: BigNumberish], BN>;
    get_pool: InvokeFunction<[pool_id: BigNumberish], Option<PoolOutput>>;
    get_pool_balance: InvokeFunction<[pool_id: BigNumberish], Option<PoolBalanceOutput>>;
    withdraw_balance: InvokeFunction<[pool_id: BigNumberish], void>;
  };
}
