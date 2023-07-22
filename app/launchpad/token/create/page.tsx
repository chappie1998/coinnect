"use client";

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
    const abi: ABI = require("/sway_contracts/src-20/out/debug/src-20-abi.json");
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
    <div className="container py-6">
      <div className="ant-card ant-card-bordered">
        <div className="has-text-centered mt-6 mb-4">
          {contractId ? (
            <button type="button" className="ant-btn ant-btn-primary" disabled>
              <span>Contract Deployed</span>
            </button>
          ) : (
            <button
              type="button"
              className="ant-btn ant-btn-primary"
              onClick={deployContract}
            >
              <span>Deploy Contract</span>
            </button>
          )}
        </div>
        <div className="ant-card-body">
          <form ref={formRef}>
            <p className="has-text-primary is-size-7">(*) is required field.</p>
            <div className="field">
              <label htmlFor="tokenType" className="label">
                Token Type<sup className="has-text-danger">*</sup>
              </label>
              <div className="control">
                <select name="tokenType" id="tokenType" className="input">
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
                <p className="help is-info"> 30 MATIC</p>
              </div>
            </div>
            <div className="field">
              <label htmlFor="tokenName" className="label">
                Name<sup className="has-text-danger">*</sup>
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  id="tokenName"
                  name="tokenName"
                  placeholder="Ex: FUEL TOKEN"
                  maxLength={255}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="tokenSymbol" className="label">
                Symbol<sup className="has-text-danger">*</sup>
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  id="tokenSymbol"
                  name="tokenSymbol"
                  placeholder="Ex: FUEL"
                  maxLength={255}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="tokenDecimals" className="label">
                Decimals<sup className="has-text-danger">*</sup>
              </label>
              <div className="control">
                <input
                  type="number"
                  className="input"
                  id="tokenDecimals"
                  name="tokenDecimals"
                  placeholder="Ex: 9"
                  max={9}
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="totalSupply" className="label">
                Total supply<sup className="has-text-danger">*</sup>
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  id="totalSupply"
                  name="totalSupply"
                  placeholder="Ex: 100000000000"
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
              <button
                type="button"
                onClick={callConstructor}
                className="ant-btn ant-btn-primary"
              >
                <span>Create token</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
