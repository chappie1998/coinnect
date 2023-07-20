"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Src20Abi__factory } from "@/contracts/src-20";
import { Wallet } from "fuels";

export default function Home() {
  // const wallet = Wallet.fromPrivateKey(
  //   "0xc852a8675f20538e3c578f56d59ea928035fda840b428e873e8abc04bb2a57ab",
  //   "https://beta-3.fuel.network/graphql"
  // );
  // const admin =
  //   "0xfec21894a55b54b3dd89ab836856403d20f20d2af3694e13e64a32b3e1d41f0a";
  // const account = Wallet.fromAddress(
  //   "fuel1wlmnq4cpuq5savtp9njlzt8kkrf2f27za0fzgumsgadfldxngm2qyf8ada"
  // );
  // console.log(account.address.toB256());

  const wallet = Wallet.fromPrivateKey(
    "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
  );
  const admin =
    "0x6b63804cfbf9856e68e5b6e7aef238dc8311ec55bec04df774003a2c96e0418e";

  // const newcontract = Src20Abi__factory.connect(
  //   "0x90b8b171ec0d871bdb8b3f6d700148943522e59d16ca2c90350ea649b9e7dedf",
  //   wallet
  // );

  const contract = Src20Abi__factory.connect(
    "0xb5e5b8a8c213decc256bdb86efeca25688cac27e46feebd23b4fa9026cd11782",
    wallet
  );

  const get_token = async () => {
    console.log("get_token start");
    const get_token = await contract.functions.get_token().get();
    console.log("name", get_token);
  };

  const callConstructor = async () => {
    console.log("some1 start");
    const lol = await contract.functions
      .constructor(9, "coinnect  ", "CONT", 1000, { value: admin })
      .txParams({ gasPrice: 1 })
      .call();
    console.log("some1", lol);
  };

  return (
    <main className={styles.main}>
      <div>
        <button onClick={callConstructor}>callConstructor</button>
        <br />
        <button onClick={get_token}>get_token</button>
      </div>
    </main>
  );
}
