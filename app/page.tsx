"use client";

import { Src20Abi__factory } from "@/contracts/src-20";
import { BN, NativeAssetId, Wallet } from "fuels";
import { LaunchpadAbi__factory } from "@/contracts/launchpad";
import { useRouter } from 'next/navigation'
import Header from "./component/header";
import Image from 'next/image'
import gif from "./assets/rocket_3.gif"

export default function Home() {
  // const wallet = Wallet.fromPrivateKey(
  //   "0xc852a8675f20538e3c578f56d59ea928035fda840b428e873e8abc04bb2a57ab",
  //   "https://beta-3.fuel.network/graphql"
  // );
  // const admin =
  //   "0xfec21894a55b54b3dd89ab836856403d20f20d2af3694e13e64a32b3e1d41f0a";
  // const account = Wallet.fromAddress(
  //   "fuel1dd3cqn8mlxzku689kmn6au3cmjp3rmz4hmqymam5qqaze9hqgx8qtjpwn9"
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

  console.log(
    "block:- ",
    wallet.provider.getBlockNumber().then((data) => data)
  );

  const contractId =
    "0xccd539378bdbd3e76ff74649805805740bb4573609dc208a25b1869a9c4e7402";
  const contract = Src20Abi__factory.connect(contractId, wallet);

  const launchpadContract = LaunchpadAbi__factory.connect(
    "0x876227337bd41de63ac21d5314bbad6719593877502cd0d3a5badc3bb06654ed",
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
      .constructor("COIN TOKEN", "COIN", 9, 10000 * 1e9, { value: admin })
      .txParams({ gasPrice: 1 })
      .call();
    console.log("some1", lol);
  };

  const create_pool = async () => {
    console.log("create_pool start");
    // let asset =
    //   "0xccd539378bdbd3e76ff74649805805740bb4573609dc208a25b1869a9c4e7402";
    // const nativeAsset = NativeAssetId;
    const hardCap = 1000 * 1e9;
    const create_pool = await launchpadContract.functions
      .create_pool(
        { value: contractId },
        { value: NativeAssetId },
        10,
        1 * 1e9,
        hardCap,
        0.01 * 1e9,
        0.1 * 1e9,
        2,
        50
      )
      .txParams({ gasPrice: 1 })
      .callParams({
        forward: [hardCap, contractId],
      })
      .call();
    console.log("create_pool", create_pool);
  };

  const buy_token = async () => {
    console.log("block:- ", Number(await wallet.provider.getBlockNumber()));
    console.log("buy_token start");
    const amount = 0.02 * 1e9;
    const buy_token = await launchpadContract.functions
      .buy_token(0, amount)
      .txParams({ gasPrice: 1 })
      .callParams({
        forward: [amount, NativeAssetId],
      })
      .call();
    console.log("buy_token", buy_token);
  };

  const get_pool = async () => {
    console.log("get_pool start");
    const get_pool = await launchpadContract.functions.get_pool(0).get();
    console.log("name", get_pool);
  };

  const get_pool_balance = async () => {
    console.log("get_pool_balance start");
    const get_pool_balance = await launchpadContract.functions
      .get_pool_balance(0)
      .get();
    console.log("name", get_pool_balance);
    console.log("selling", Number(get_pool_balance.value?.selling_asset) / 1e9);
    console.log("buying", Number(get_pool_balance.value?.buying_asset) / 1e9);
  };



  const router = useRouter()
   
  return (
    <main className="h-screen w-full bgform">
      <Header></Header>
      <div className="w-full h-full flex justify-center items-center space-y-10 space-x-10">
        <Image
            src={gif}
            alt="gif"
            width={500}
            height={500}
            className=""
          />
        <div className="space-y-5 w-[40%] flex flex-col justify-center">
          <h1 className="font-mpro text-6xl bg-clip-text tracking-wide text-white mb-10">
          Your ERC-20 <br /> launchpad <br /> on Fuel
          </h1>
          <a className="font-mpro w-fit cursor-pointer border text-white rounded-full border-white p-2 hover:bg-white hover:text-neutral-800 transition duration-300 hover:ease-in" onClick={() => router.push('/launchpad/token/create')}>
            Token Launchpad
            </a>
        </div>
      </div>

      <div className="hidden">
        <button onClick={callConstructor}>callConstructor</button>
        <br />
        <button onClick={get_token}>get_token</button>
        <br />
        <button onClick={create_pool}>create_pool</button>
        <br />
        <button onClick={get_pool}>get_pool</button>
        <br />
        <button onClick={get_pool_balance}>get_pool_balance</button>
        <br />
        <button onClick={buy_token}>buy_token</button>
      </div>
    </main>
  );
}
