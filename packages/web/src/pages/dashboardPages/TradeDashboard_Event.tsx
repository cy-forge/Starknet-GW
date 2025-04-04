import { PopularTokenCard } from "@/components/dashboard/tradeCards";
import TradeEvent from "@/components/dashboard/tradeEvent";
import { Copy } from "lucide-react";

function TradeDashboard_Event() {
  return (
    <div className=" max-md:mt-16">
      <h1 className="text-2xl">Trade Dashboard</h1>
      <div className="mt-10"></div>
      <div className="flex lg:flex-row flex-col-reverse gap-3 h-auto w-full">
        <div className="bg-transparent w-full lg:w-[65%]   items-start ">
          <div className="lg:flex-1 flex  ">
            <PopularTokenCard />
          </div>
          <div className=" dark:bg-[#0A1D1C] bg-transparent dark:border-none border-[#DEDEDE] border flex flex-wrap mt-12 rounded-[8px] justify-between p-[24px] ">
            {stat.map((statistics, i) => {
              return (
                <div className="flex-col flex gap-3" key={i}>
                  <p className="text-[#9DA3AC] text-lg font-normal ">
                    {statistics.name}
                  </p>
                  <p className="dark:text-[#F4F6FA] text-[#1E1E1E] text-2xl font-normal">
                    {statistics.amount}
                  </p>
                </div>
              );
            })}
          </div>
          <div className=" dark:bg-[#0A1D1C] bg-transparent dark:border-none border border-[#DEDEDE]  gap-3 flex flex-col mt-12 rounded-[8px] items-start p-[24px] ">
            <p className="text-lg font-normal text-[#1E1E1E] dark:text-[#F4F6FA] capitalize">
              About Ether
            </p>
            <div className="w-full flex-col flex items-start border-b pb-5 border-b-[#314140] ">
              <p className="dark:text-[#F4F6FA] text-[#1E1E1E] font-normal text-sm">
                ETH (Ether) is the native gas token for the starkNet Global
                wallet. it serves as the wallet’s primary currency for paying
                transaction fee (gas)
              </p>
            </div>
            <div className="pt-5 flex-wrap flex items-start gap-3">
              <span className="border w-fit items-center flex gap-2 border-[#5F6C6B] text-[12px] text-[#5F6C6B] rounded-[48px] py-[10px] px-[24px]">
                <Copy className="text-[#5F6C6B] text-[12px]" /> 0x00000000
              </span>
              <span className="border items-center  w-fit flex gap-2 border-[#5F6C6B] text-[12px] text-[#5F6C6B] rounded-[48px] py-[10px] px-[24px]">
                <Copy className="text-[#5F6C6B] text-[12px]" /> Explorer
              </span>
              <span className="border items-center  w-fit flex gap-2 border-[#5F6C6B] text-[12px] text-[#5F6C6B] rounded-[48px] py-[10px] px-[24px]">
                <Copy className="text-[#5F6C6B] text-[12px]" /> Stark Scan
              </span>
              <span className="border items-center  w-fit flex gap-2 border-[#5F6C6B] text-[12px] text-[#5F6C6B] rounded-[48px] py-[10px] px-[24px]">
                <Copy className="text-[#5F6C6B] text-[12px]" /> Voyager
              </span>
            </div>
          </div>
          <div className="dark:bg-[#0A1D1C] bg-transparent dark:border-none border border-[#DEDEDE]  gap-3  flex flex-col mt-12 rounded-[8px] items-start p-[24px] ">
            <p className="text-lg font-normal text-[#1E1E1E] dark:text-[#F4F6FA]">
              Transactions
            </p>
            <div className="w-full flex-col flex items-center justify-center">
              <p className="dark:text-[#9DA3AC] font-normal text-center text-sm">
                No transactions found for this contract
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-[35%] w-full">
          <TradeEvent />
        </div>
      </div>
    </div>
  );
}

export default TradeDashboard_Event;

const stat = [
  {
    name: "Market Cap",
    amount: "$37.62M",
  },
  {
    name: "24h Volume",
    amount: "$6.24M",
  },
  {
    name: "Total Supply",
    amount: "16046.16",
  },
];
