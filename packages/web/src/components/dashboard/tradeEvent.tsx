import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

function TradeEvent() {
  const [activeTab, setActiveTab] = useState("trade");

  return (
    <div className="w-full bg-transparent border border-[#D1D1D1] dark:border-none  dark:bg-[#0A1D1C] items-start p-[24px] rounded-[16px] flex flex-col gap-6">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="flex flex-row gap-4">
          <Button
            variant={activeTab === "trade" ? "default" : "outline"}
            onClick={() => setActiveTab("trade")}
          >
            Trade
          </Button>
          <Button
            variant={activeTab === "send" ? "default" : "outline"}
            onClick={() => setActiveTab("send")}
          >
            Send
          </Button>
          <Button
            variant={activeTab === "receive" ? "default" : "outline"}
            onClick={() => setActiveTab("receive")}
          >
            Receive
          </Button>
        </div>
        <div className="h-[32px] w-[32px] rounded-full bg-[#343434]" />
      </div>

      <Separator />

      <div className="w-full">
        {activeTab === "trade" && <Trade />}
        {activeTab === "receive" && <Recieve />}
      </div>
    </div>
  );
}

export default TradeEvent;

const Trade = () => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <div className="dark:bg-[#022D28] bg-transparent border dark:border-none border-[#D1D1D1]  w-full rounded-[16px] py-[24px] px-[12px] ">
        <div className="w-full flex-col gap-3 flex">
          <p className="text-[#5F6C6B] text-sm font-normal ">Sell</p>
          <div className="flex-row w-full flex items-center justify-between ">
            <div className="rounded-[48px] flex p-4 w-fit bg-[#0A1D1C] gap-2">
              <div className="rounded-full w-[24px] h-[24px] bg-[#343434]" />
              <button className="font-normal text-xs capitalize text-[#F4F6FA]">
                Select Token
              </button>
              <div className="rounded-full w-[24px] h-[24px] bg-[#D5D5D5]" />
            </div>
            <div>
              <p className="text-[#D5D5D5] dark:text-[#D5D5D5] font-normal text-2xl">
                0.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dark:bg-[#022D28] bg-transparent border dark:border-none border-[#D1D1D1] w-full rounded-[16px] py-[24px] px-[12px] mb-3">
        <div className="w-full flex-col gap-3 flex">
          <p className="text-[#5F6C6B] text-sm font-normal ">Buy</p>
          <div className="flex-row w-full flex items-center justify-between ">
            <div className="rounded-[48px] flex p-4 w-fit bg-transparent  border dark:border-none  dark:bg-[#0A1D1C] gap-2">
              <div className="rounded-full w-[24px] h-[24px] bg-[#D5D5D5]" />
              <button className="font-normal text-xs capitalize text-[#1E1E1E] dark:text-[#F4F6FA]">
                Select Token
              </button>
              <div className="rounded-full w-[24px] h-[24px] bg-[#D5D5D5]" />
            </div>
            <div>
              <p>0.00</p>
              <p className="text-[#5F6C6B] font-normal text-xs">$ 0.00</p>
            </div>
          </div>
        </div>
      </div>

      <Separator />
      <Button className="w-full">Review</Button>
    </div>
  );
};

const Recieve = () => {
  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-xs font-normal text-[#2D2D2D] dark:text-[#F4F6FA] text-center leading-[20px] w-[90%]">
        Receive ETH directly to your wallet by copying your wallet address or
        scanning the QR code. Funds must be sent on Abstract Network.
      </p>
      <div className="flex-col flex items-center gap-3 mb-3">
        <img src="/dashboardIcons/Sell.svg" className="" />
        <Button className="bg-[#314140]">
          <Plus /> Copy Address
        </Button>
      </div>
      <Separator />
      <div className="my-3 flex-col items-center w-full flex">
        <div className="flex justify-between w-full">
          <div className="flex-col flex ">
            <p className="text-[#1E1E1E] dark:text-[#F4F6FA] text-sm font-bold capitalize">
              Your Wallet
            </p>
            <p className="text-[#9DA3AC] text-base font-normal">
              0x6526...644a
            </p>
          </div>
          <div className="flex-col flex ">
            <p className="text-[#9DA3AC] text-base font-normal capitalize">
              0.00 Eth
            </p>
            <p className="text-[#1E1E1E] dark:text-[#F4F6FA] text-base font-normal">
              0.00
            </p>
          </div>
        </div>

        <p className="mt-3 text-center font-bold text-xs">
          Make sure to send funds on Abstract Network
        </p>
      </div>
    </div>
  );
};
