import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

const categories = ["All", "DeFi", "Gaming", "Staking", "NFTs", "SocialFi"];

const projects = [
  {
    id: 1,
    tag: "Built On Starknet",
    title: "Ekubo Protocol",
    description: "The Most Advanced AMM Ever",
    content:
      "Ekubo provides concentrated liquidity and extensible swaps on Starknet.",
    category: "DeFi",
  },
  {
    id: 2,
    tag: "Built On Starknet",
    title: "Realms",
    description: "Fully On-Chain Strategy Game",
    content:
      "Realms lets players govern and expand their realms in a fully decentralized gaming experience.",
    category: "Gaming",
  },
  {
    id: 3,
    tag: "Built On Starknet",
    title: "StarkDefi",
    description: "Launchpad and Yield Farming",
    content:
      "StarkDefi offers yield farming, token launchpad, and decentralized lending markets.",
    category: "DeFi",
  },
  {
    id: 4,
    tag: "Built On Starknet",
    title: "Aspect",
    description: "NFT Marketplace on Starknet",
    content:
      "Aspect is a decentralized marketplace where you can mint, buy, and sell NFTs on Starknet.",
    category: "NFTs",
  },
  {
    id: 5,
    tag: "Built On Starknet",
    title: "zkLend",
    description: "Money Markets on Starknet",
    content:
      "zkLend enables scalable lending and borrowing, blending DeFi and TradFi features on Starknet.",
    category: "DeFi",
  },
  {
    id: 6,
    tag: "Built On Starknet",
    title: "Influence",
    description: "Space Economy MMO",
    content:
      "Influence is a strategy game where players mine asteroids and build economies, powered by blockchain.",
    category: "Gaming",
  },
  {
    id: 7,
    tag: "Built On Starknet",
    title: "JediSwap",
    description: "Decentralized AMM",
    content:
      "JediSwap is a Starknet-native, community-driven Automated Market Maker (AMM) DEX.",
    category: "DeFi",
  },
  {
    id: 8,
    tag: "Built On Starknet",
    title: "Mesh Finance",
    description: "SocialFi on Starknet",
    content:
      "Mesh Finance creates social savings circles and decentralized group investments.",
    category: "SocialFi",
  },
  {
    id: 9,
    tag: "Built On Starknet",
    title: "Mint Square",
    description: "NFT Launchpad",
    content:
      "Mint Square helps creators mint, launch, and trade NFTs directly on Starknet with low fees.",
    category: "NFTs",
  },
  {
    id: 10,
    tag: "Built On Starknet",
    title: "StarkNet ID",
    description: "On-Chain Identity Protocol",
    content:
      "StarkNet ID enables users to create decentralized identities (DIDs) for login and verification.",
    category: "Staking",
  },
];

export default function Discover() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeTab === "All" || project.category === activeTab;
      const matchesSearch = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  function handleRefresh() {
    setSearchTerm("");
    setActiveTab("All");
  }

  return (
    <section className="max-md:mt-16">
      <h1 className="text-2xl">Discover</h1>

      <div className="mt-10">
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          className="discoverSwiper"
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="rounded-xl overflow-hidden h-full">
                <div className="bg-[#131216] dark:bg-[#EBEBEB] text-white p-6 rounded-t-xl">
                  <div className="flex justify-start">
                    <span className="bg-[#222335] text-[#26E7AD] text-xs font-medium px-3 py-1 rounded-full">
                      {project.tag}
                    </span>
                  </div>
                  <h1 className="text-[32px] mt-4 text-[#661CC4]">
                    {project.title}
                  </h1>
                </div>
                <div className="bg-[#F4F6FA] dark:bg-[#0A1D1C] text-black dark:text-white rounded-b-xl px-6 py-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#D9D9D9] rounded-full"></div>
                    <div className="ml-4">
                      <h2 className="text-lg text-[#2D2D2D] dark:text-[#F4F6FA]">
                        {project.title}
                      </h2>
                      <p className="text-sm text-[#1E1E1E] dark:text-[#9DA3AC]">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#1E1E1E] dark:text-[#F4F6FA]">
                    {project.content}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="bg-[#F4F6FA] dark:bg-[#0A1D1C] p-15 flex justify-center items-center rounded-xl my-10">
        <h1 className="text-2xl text-center">Explore All Dapps In One Place</h1>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white dark:bg-transparent p-2 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === category
                  ? "text-black dark:text-white border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <button
            onClick={handleRefresh}
            className="flex items-center justify-center p-2 dark:bg-white bg-gray-200 rounded-md"
          >
            <RefreshCw className="w-5 h-5 text-black dark:text-black" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden bg-[#F4F6FA] dark:bg-[#0A1D1C] h-full"
            >
              <div className="text-black dark:text-white px-6 py-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#D9D9D9] rounded-full"></div>
                  <div className="ml-4">
                    <h2 className="text-lg text-[#2D2D2D] dark:text-[#F4F6FA]">
                      {project.title}
                    </h2>
                    <p className="text-sm text-[#1E1E1E] dark:text-[#9DA3AC]">
                      {project.description}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#1E1E1E] dark:text-[#F4F6FA]">
                  {project.content}
                </p>
                <div className="mt-6">
                  <span className="inline-block bg-[#D9D9D9] dark:bg-[#314140] rounded-full px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground text-sm col-span-2">
            No Dapps found.
          </p>
        )}
      </div>
    </section>
  );
}
