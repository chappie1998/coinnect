"use client";

import Header from "@/app/component/header";
import { Src20Abi__factory } from "@/contracts/src-20";
import { ABI, BytesLike, ContractFactory, Wallet } from "fuels";
import { useRef, useState } from "react";
// import fs from "node:fs";

// const binFile =
//   "/home/ankit/coinnect/sway_contracts/src-20/out/debug/src-20.bin";

const buffer = require("buffer");

export default function create() {
  const formRef = useRef<any>(null);

  // const [contractDeployed, setContractDeployed] = useState(false);
  const [contractId, setContractID] = useState<string>();

  const wallet = Wallet.fromPrivateKey(
    "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
  );
  const admin =
    "0x6b63804cfbf9856e68e5b6e7aef238dc8311ec55bec04df774003a2c96e0418e";

  // const contract = Src20Abi__factory.connect(
  //   "0xb5e5b8a8c213decc256bdb86efeca25688cac27e46feebd23b4fa9026cd11782",
  //   wallet
  // );
  const callConstructor = async () => {
    if (!contractId) {
      alert("Deploy contract First");
      return;
    }
    const form = formRef.current;
    form.reportValidity();
    if (form.checkValidity()) {
      const formControls = form.elements;
      const tokenName = formControls["tokenName"].value;
      const tokenSymbol = formControls["tokenSymbol"].value;
      const tokenDecimals = formControls["tokenDecimals"].value;
      const totalSupply = formControls["totalSupply"].value;
      console.log(tokenName, tokenSymbol, tokenDecimals, totalSupply);

      // try {
      const contract = Src20Abi__factory.connect(contractId, wallet);
      console.log(contract);
      const constructor = await contract.functions
        .constructor(tokenName, tokenSymbol, tokenDecimals, totalSupply, {
          value: admin,
        })
        .txParams({ gasPrice: 1 })
        .call();
      console.log("done", constructor);
      // } catch (error) {
      //   console.log(error);
      //   alert("token Creation failed"!);
      // }
    }
  };

  const deployContract = async () => {
    // load the byteCode of the contract, generated from Sway source
    const data = await fetch("/sway_contracts/src-20/out/debug/src-20.bin");

    // console.log(data);
    var byteCode = new Uint8Array(await data.arrayBuffer());
    const buff: BytesLike = buffer.Buffer.from(byteCode);

    // load the JSON abi of the contract, generated from Sway source
    const abi: ABI = ""
    console.log(abi);

    // const buff = fs.readFileSync(binFile);

    // send byteCode and ABI to ContractFactory to load
    const factory = new ContractFactory(buff, abi, wallet);
    console.log(factory);

    const contract = await factory.deployContract();
    console.log("contract successful deployed", contract.id);
    console.log("contract successful deployed", contract.id.toB256());

    setContractID(contract.id.toB256());
  };
  return (
    <div className="h-screen w-full bgform">
      <Header></Header>
      <div className="w-full h-full flex justify-center items-center pt-10 font-mpro">
        <div className="w-fit bg-white rounded-md flex flex-col p-5 justify-end items-center border border-white">
          <h1 className="text-3xl w-full text-center border-b border-neutral-800 mb-5 pb-2">Token launchpad (preview)</h1>
          <div className="flex items-center w-full mb-5 space-x-5">
            <h1 className="text-xl font-bold">Deploy the contract</h1>
            {contractId ? (
              <button type="button" className="p-2 border border-neutral-800 rounded-full bg-emerald-500" disabled>
                <span>Contract Deployed</span>
              </button>
            ) : (
              <button
                type="button"
                className="p-2 border border-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition duration-300 hover:ease-in"
                onClick={deployContract}
              >
                <span>Deploy Contract</span>
              </button>
            )}
          </div>
          <div className="mx-40 w-full">
            <form ref={formRef} className="space-y-5 w-[80%]">
              <div className="w-full flex space-x-10 items-center">
                <label htmlFor="tokenType" className="text-xl font-bold">
                  Token Type<sup className="text-red-500">*</sup>
                </label>
                <div className="control">
                  <select name="tokenType" id="tokenType" className="input border rounded-md p-2 border-neutral-800" required>
                    <option value="standard">Standard Token</option>
                    {/* <option value="liquidity" disabled>
                  Liquidity Generator Token
                </option>
                <option value="baby" disabled>
                  Baby Token
                </option>
                <option value="buyback" disabled>
                  Buyback Baby Token
                </option> */}
                  </select>
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="tokenName" className="text-xl font-bold">
                  Name<sup className="text-red-500">*</sup>
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="w-full border rounded-md p-1 border-neutral-800"
                    id="tokenName"
                    name="tokenName"
                    placeholder="Token Name"
                    maxLength={255}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="tokenSymbol" className="text-xl font-bold">
                  Symbol<sup className="text-red-500">*</sup>
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="w-full border rounded-md p-1 border-neutral-800"
                    id="tokenSymbol"
                    name="tokenSymbol"
                    placeholder="FUEL"
                    maxLength={255}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="tokenDecimals" className="text-xl font-bold">
                  Decimals<sup className="text-red-500">*</sup>
                </label>
                <div className="control">
                  <input
                    type="number"
                    className="w-full border rounded-md p-1 border-neutral-800"
                    id="tokenDecimals"
                    name="tokenDecimals"
                    placeholder="9"
                    max={9}
                    min={1}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="totalSupply" className="text-xl font-bold">
                  Total supply<sup className="text-red-500">*</sup>
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="w-full border rounded-md p-1 border-neutral-800"
                    id="totalSupply"
                    name="totalSupply"
                    placeholder="100000000000"
                    required
                  />
                </div>
              </div>
              {/* <div className="field">
              <label className="ant-checkbox-wrapper">
                <span className="ant-checkbox">
                  <input
                    type="checkbox"
                    className="ant-checkbox-input"
                    value=""
                  />
                  <span className="ant-checkbox-inner"></span>
                </span>
                <span>Implement Pink Anti-Bot System?</span>
              </label>
            </div> */}
              <div className="has-text-centered mt-6 mb-4">
              {contractId ? (
                <button
                type="button"
                onClick={callConstructor}
                className="p-2 border border-neutral-800 rounded-full hover:bg-neutral-800 hover:text-white transition duration-300 hover:ease-in"
              >
                <span>Create token</span>
              </button>
              ) : (
                <div className="flex flex-col w-fit">
                  <button
                  disabled
                  aria-disabled
                  type="button"
                  onClick={callConstructor}
                  className="p-2 border border-gray-200 text-gray-200 rounded-full"
                >
                  <span>Create token</span>
                </button>
                <span className="text-red-500 mt-5">Your need to deploy the contract first !</span>
                </div>
              ) }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
