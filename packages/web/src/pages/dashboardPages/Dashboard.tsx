import { SvgIcons } from '@/assets/SvgIcons';
import { tokenColumns } from '@/components/dashboard/columns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, EmptyCard } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const DashboardPage = () => {
  return (
    <section className="max-md:mt-16">
      <h1 className="text-2xl">Home Dashboard</h1>
      <div className="mt-10">
        <Card>
          <article className="flex md:justify-between gap-2 px-3 md:px-6 max-md:flex-col">
            <section className="text-lg flex flex-col gap-6 justify-between h-full">
              <div className="flex gap-4 items-center">
                <span>Total Balance</span>
                <span>{SvgIcons['eyeClosed']()}</span>
                <span>{SvgIcons['refresh']()}</span>
              </div>
              <div>
                <span className="text-[1.75rem] leading-normal">$0</span>
                <span className="flex gap-2 items-center text-grayish">
                  <span>+$0</span>
                  <span className="rounded-full h-[1.375rem] border border-[#59FFCA] text-[#59FFCA] px-3 py-1 flex justify-center items-center">
                    +0%
                  </span>
                </span>
              </div>
            </section>
            <section className="rounded-xl p-4 bg-gray-green dark:bg-transparent flex flex-col gap-6">
              <h2>Actions</h2>
              <div className="md:flex items-center gap-3 mt-auto flex-1 max-md:grid grid-cols-2">
                <Button className="px-12 py-3 text-sm">
                  <span>{SvgIcons['fund']()}</span>
                  <span>Fund</span>
                </Button>
                <Button
                  variant={'outline'}
                  className="px-12 py-3 text-sm text-grayish bg-transparent dark:bg-[#314140] dark:border-transparent"
                >
                  <span>{SvgIcons['arrow-right']()}</span>
                  <span>Send</span>
                </Button>
                <Button
                  variant={'outline'}
                  className="px-12 py-3 text-sm text-grayish bg-transparent dark:bg-[#314140] dark:border-transparent"
                >
                  <span>{SvgIcons['expand']()}</span>
                  <span>Expand</span>
                </Button>
              </div>
            </section>
          </article>
        </Card>
        <Tabs defaultValue="tokens" className="w-full mt-8">
          <div className="flex justify-between flex-wrap">
            <TabsList className="flex mb-2">
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="nfts" className="">
                NFTs
              </TabsTrigger>
              <TabsTrigger value="history" className="">
                Transaction History
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2 justify-between items-center mb-2 flex-wrap">
              <Button
                size="lg"
                variant={'outline'}
                className="px-12 py-3 text-sm bg-transparent dark:bg-[#314140] dark:border-transparent"
              >
                <span>{SvgIcons['arrow-right']()}</span>
                <span>Manage Liquidity</span>
              </Button>
              <Button size="lg" variant="ghost" className="dark:bg-[#022D28]">
                <span>{SvgIcons['arrow-right']()}</span> Search
              </Button>
              <Button
                variant="outline"
                className="!border-[#2D2D2D] dark:!border-tealish !bg-transparent dark:text-tealish h-[38px] w-[38px]"
              >
                <span>{SvgIcons['refresh']()}</span>
              </Button>
            </div>
          </div>

          <TabsContent value="tokens">
            <Card className="bg-transparent border-transparent shadow-none">
              <CardContent className="pt-4">
                <DataTable data={tokens} columns={tokenColumns} />
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
      </div>
    </section>
  );
};

export default DashboardPage;
const tokens = [
  {
    name: 'Ether',
    env: 'ETH',
    price: 2348.68,
    hourChange: 0,
    dayChange: 0,
    balance: 0,
  },
  {
    name: 'Stark',
    env: 'Strk',
    price: 0.2,
    hourChange: 0,
    dayChange: 0,
    balance: 0,
  },
];


