type Props = object;

function Sidebar(props: Props) {
  return (
    <div className="w-[20%] items-start flex flex-col font-bold text-2xl text-black bg-white p-6 rounded-[8px]">
      <p className="font-normal text-lg capitalize ">StarkNet Global wallet</p>
      <div className="gap-12 flex w-full flex-col ">
        {items.map((list, i) => {
          return (
            <div
              key={i}
              className="bg-[#F4F6FA] items-center flex flex-row p-1 w-full h-48px gap-[18px] rounded-[45px] "
            >
              <div className="p-1 flex items-center justify-center flex-col  bg-white w-[40px] h-[40px] rounded-full">
                <img src={list.icon} alt="" className="height-auto w-auto" />
              </div>

              <p className="text-[#9DA3AC] font-normal text-lg capitalize">
                {" "}
                {list.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;

const items = [
  { icon: "/dashboardIcons/sidebar-discover.svg", name: "Wallet" },
  { icon: "/dashboardIcons/sidebar-discover.svg", name: "Discover" },
  { icon: "/dashboardIcons/sidebar-trade.svg", name: "Trade" },
  { icon: "/dashboardIcons/sidebar-reward.svg", name: "Rewards" },
  { icon: "/dashboardIcons/sidebar-develop.svg", name: "Develop" },
  { icon: "/dashboardIcons/sidebar-bug.svg", name: "Bug Report" },
  { icon: "/dashboardIcons/sidebar-discover.svg", name: "Security" },
  { icon: "/dashboardIcons/sidebar-settings.svg", name: "Settings" },
];
