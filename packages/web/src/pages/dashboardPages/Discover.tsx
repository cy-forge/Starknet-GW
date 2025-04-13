import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const Discover = () => {
  const [activeTab, setActiveTab] = useState("All");
  const categories = ["All", "DeFi", "Gaming", "Staking", "NFTs", "SocialFi"];

  const projects = [
    {
      id: 1,
      tag: "Built On Starknet",
      title: "Ekubo Protocol",
      description: "The Most Advanced AMM Ever",
      content:
        "Ekubo Protocol delivers the best pricing using super-concentrated liquidity, a singleton architecture, and extensions. The Ekubo Protocol vision is to provide a balance between the best swap execution and liquidity provider returns.",
      category: "DeFi",
    },
    {
      id: 2,
      tag: "Built On Starknet",
      title: "Ekubo Protocol",
      description: "The Most Advanced AMM Ever",
      content:
        "Ekubo Protocol delivers the best pricing using super-concentrated liquidity, a singleton architecture, and extensions. The Ekubo Protocol vision is to provide a balance between the best swap execution and liquidity provider returns.",
      category: "Gaming",
    },
    {
      id: 3,
      tag: "Built On Starknet",
      title: "Ekubo Protocol",
      description: "The Most Advanced AMM Ever",
      content:
        "Ekubo Protocol delivers the best pricing using super-concentrated liquidity, a singleton architecture, and extensions. The Ekubo Protocol vision is to provide a balance between the best swap execution and liquidity provider returns.",
      category: "Staking",
    },
    {
      id: 4,
      tag: "Built On Starknet",
      title: "Ekubo Protocol",
      description: "The Most Advanced AMM Ever",
      content:
        "Ekubo Protocol delivers the best pricing using super-concentrated liquidity, a singleton architecture, and extensions. The Ekubo Protocol vision is to provide a balance between the best swap execution and liquidity provider returns.",
      category: "NFTs",
    },
  ];

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
                  <h1 className="text-[32px] mt-4 text-[#661CC4] dark:text-">
                    {project.title}
                  </h1>
                </div>
                <div className="bg-[#F4F6FA] dark:bg-[#0A1D1C] text-black rounded-b-xl px-6 py-6">
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
          <Input placeholder="Search" className="w-full md:w-64" />
          <button className="flex items-center justify-center p-2 dark:bg-white rounded-md">
            <img src="/search-icon.svg" alt="Search" className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            className="rounded-xl overflow-hidden bg-[#F4F6FA] dark:bg-[#0A1D1C] h-full"
            key={project.id}
          >
            <div className=" text-black rounded-b-xl px-6 py-6">
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
        ))}
      </div>
    </section>
  );
};

export default Discover;
