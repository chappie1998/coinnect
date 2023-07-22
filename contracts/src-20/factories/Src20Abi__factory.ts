/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.39.1
  Forc version: 0.35.5
  Fuel-Core version: 0.17.3
*/

import { Interface, Contract } from "fuels";
import type { Provider, Account, AbstractAddress } from "fuels";
import type { Src20Abi, Src20AbiInterface } from "../Src20Abi";

const _abi = {
  "types": [
    {
      "typeId": 0,
      "type": "()",
      "components": [],
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 2,
      "type": "str[10]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 3,
      "type": "str[3]",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 4,
      "type": "struct Address",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 5,
      "type": "struct ContractId",
      "components": [
        {
          "name": "value",
          "type": 1,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 6,
      "type": "struct Token",
      "components": [
        {
          "name": "name",
          "type": 2,
          "typeArguments": null
        },
        {
          "name": "symbol",
          "type": 3,
          "typeArguments": null
        },
        {
          "name": "decimals",
          "type": 8,
          "typeArguments": null
        },
        {
          "name": "total_supply",
          "type": 7,
          "typeArguments": null
        },
        {
          "name": "owner",
          "type": 4,
          "typeArguments": null
        }
      ],
      "typeParameters": null
    },
    {
      "typeId": 7,
      "type": "u64",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 8,
      "type": "u8",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [
        {
          "name": "name",
          "type": 2,
          "typeArguments": null
        },
        {
          "name": "symbol",
          "type": 3,
          "typeArguments": null
        },
        {
          "name": "decimals",
          "type": 8,
          "typeArguments": null
        },
        {
          "name": "supply",
          "type": 7,
          "typeArguments": null
        },
        {
          "name": "recipient",
          "type": 4,
          "typeArguments": null
        }
      ],
      "name": "constructor",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read",
            "write"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "decimals",
      "output": {
        "name": "",
        "type": 8,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "get_token",
      "output": {
        "name": "",
        "type": 6,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "name",
      "output": {
        "name": "",
        "type": 2,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "owner",
      "output": {
        "name": "",
        "type": 4,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "symbol",
      "output": {
        "name": "",
        "type": 3,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [],
      "name": "total_supply",
      "output": {
        "name": "",
        "type": 7,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "asset_id",
          "type": 5,
          "typeArguments": null
        },
        {
          "name": "amount",
          "type": 7,
          "typeArguments": null
        }
      ],
      "name": "withdraw_balance",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": []
}

export class Src20Abi__factory {
  static readonly abi = _abi
  static createInterface(): Src20AbiInterface {
    return new Interface(_abi) as unknown as Src20AbiInterface
  }
  static connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): Src20Abi {
    return new Contract(id, _abi, accountOrProvider) as unknown as Src20Abi
  }
}
