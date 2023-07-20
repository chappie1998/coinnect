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

export type AddressInput = { value: string };
export type AddressOutput = AddressInput;
export type ContractIdInput = { value: string };
export type ContractIdOutput = ContractIdInput;
export type TokenInput = { name: string, symbol: string, decimals: BigNumberish, total_supply: BigNumberish, owner: AddressInput };
export type TokenOutput = { name: string, symbol: string, decimals: number, total_supply: BN, owner: AddressOutput };

interface Src20AbiInterface extends Interface {
  functions: {
    constructor: FunctionFragment;
    decimals: FunctionFragment;
    get_token: FunctionFragment;
    name: FunctionFragment;
    owner: FunctionFragment;
    symbol: FunctionFragment;
    total_supply: FunctionFragment;
    withdraw_balance: FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'constructor', values: [BigNumberish, string, string, BigNumberish, AddressInput]): Uint8Array;
  encodeFunctionData(functionFragment: 'decimals', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'get_token', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'name', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'owner', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'symbol', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'total_supply', values: []): Uint8Array;
  encodeFunctionData(functionFragment: 'withdraw_balance', values: [ContractIdInput, BigNumberish]): Uint8Array;

  decodeFunctionData(functionFragment: 'constructor', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'decimals', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'get_token', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'name', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'owner', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'symbol', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'total_supply', data: BytesLike): DecodedValue;
  decodeFunctionData(functionFragment: 'withdraw_balance', data: BytesLike): DecodedValue;
}

export class Src20Abi extends Contract {
  interface: Src20AbiInterface;
  functions: {
    constructor: InvokeFunction<[decimals: BigNumberish, name: string, symbol: string, supply: BigNumberish, recipient: AddressInput], void>;
    decimals: InvokeFunction<[], number>;
    get_token: InvokeFunction<[], TokenOutput>;
    name: InvokeFunction<[], string>;
    owner: InvokeFunction<[], AddressOutput>;
    symbol: InvokeFunction<[], string>;
    total_supply: InvokeFunction<[], BN>;
    withdraw_balance: InvokeFunction<[asset_id: ContractIdInput, amount: BigNumberish], void>;
  };
}
