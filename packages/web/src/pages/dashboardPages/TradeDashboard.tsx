import { SvgIcons } from "@/assets/SvgIcons";
import { tradeTokenColums } from "@/components/dashboard/columns";
import { PopularTokenCard, TradeCard } from "@/components/dashboard/tradeCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent, EmptyCard } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TradeDashboard() {
  return (
    <section className="max-md:mt-16">
      <h1 className="text-2xl">Trade Dashboard</h1>
      <div className="mt-10"></div>
      <div className="w-full p-2 items-start bg-transparent gap-8 flex flex-col lg:flex-row h-auto">
        <div className="lg:flex-1 flex w-full ">
          <PopularTokenCard />
        </div>

        <div className="lg:grid flex-1 flex-col flex  grid-cols-2 gap-[11px] w-full">
          {tradecard.map((value) => {
            return (
              <TradeCard
                env={value.env}
                name={value.name}
                value={value.value}
              />
            );
          })}
        </div>
      </div>
      <Tabs defaultValue="tokens" className="w-full mt-8">
        <div className="flex justify-between flex-wrap">
          <TabsList className="flex mb-2">
            <TabsTrigger value="tokens">Trending</TabsTrigger>
            <TabsTrigger value="nfts" className="">
              Top
            </TabsTrigger>
            <TabsTrigger value="history" className="">
              Gainers
            </TabsTrigger>
          </TabsList>
          <div className="flex gap-2 justify-between items-center mb-2 flex-wrap">
            <Button
              size="lg"
              variant={"outline"}
              className="px-12 py-3 text-sm bg-transparent dark:bg-[#314140] dark:border-transparent"
            >
              <span>{SvgIcons["arrow-right"]()}</span>
              <span>Manage Liquidity</span>
            </Button>
            <Button size="lg" variant="ghost" className="dark:bg-[#022D28]">
              <span>{SvgIcons["arrow-right"]()}</span> Search
            </Button>
            <Button
              variant="outline"
              className="!border-[#2D2D2D] dark:!border-tealish !bg-transparent dark:text-tealish h-[38px] w-[38px]"
            >
              <span>{SvgIcons["refresh"]()}</span>
            </Button>
          </div>
        </div>

        <TabsContent value="tokens">
          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="pt-4">
              <DataTable data={tokens} columns={tradeTokenColums} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="nfts">
          <EmptyCard />
        </TabsContent>
        <TabsContent value="history">
          <EmptyCard />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default TradeDashboard;
const tokens = [
  {
    name: "Ether",
    env: "ETH",
    price: 2348.68,
    hourChange: 0,
    dayChange: 0,
    volume: 45643,
    mcap: 3456776,
  },
  {
    name: "Stark",
    env: "Strk",
    price: 0.2,
    hourChange: 0,
    dayChange: 0,
    volume: 46643,
    mcap: 2345778,
  },
];
const tradecard = [
  {
    value: +4.774,
    name: "Pudgy penguins",
    env: "PENGU",
  },
  {
    value: -0.744,
    name: "Pudgy penguins",
    env: "PENGU",
  },
  {
    value: -0.744,
    name: "Pudgy penguins",
    env: "PENGU",
  },
  {
    value: +4.774,
    name: "Pudgy penguins",
    env: "PENGU",
  },
];
