import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { SvgIcons } from "../../assets/SvgIcons";
import IconPlaceholder from "../shared/IconPlaceholder";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Sidebar } from "../ui/sidebar";

const SidebarItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    role="button"
    onClick={onClick}
    className={`
    flex items-center p-1 rounded-full cursor-pointer w-full gap-4
    ${active ? "bg-gray-green text-sidebar-primary" : "hover:bg-gray-100/10"}
  `}
  >
    <span className="rounded-full bg-card h-10 w-10 flex items-center justify-center shadow-[0px_0px_4px_0px_#00000033]">
      {icon}
    </span>
    <span className="text-sm font-normal">{label}</span>
  </button>
);

const sidebarItems = [
  { icon: SvgIcons["discover"](), label: "Discover", url: "/dashboard" },
  { icon: SvgIcons["trade"](), label: "Trade", url: "/dashboard/trade" },
  { icon: SvgIcons["rewards"](), label: "Rewards", url: "#" },
  { icon: SvgIcons["develop"](), label: "Develop", url: "#" },
];
const sidebarItemstoo = [
  { icon: SvgIcons["bug"](), label: "Bug Report", url: "#" },
  { icon: SvgIcons["discover"](), label: "Security", url: "#" },
  { icon: SvgIcons["setting"](), label: "Settings", url: "#" },
];
const GWSidebar = () => {
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState(() =>
    sidebarItems?.find((item) => item.url === pathname)
  );

  useEffect(() => {
    setActiveItem(sidebarItems?.find((item) => pathname.includes(item.url)));
  }, [pathname]);

  return (
    <Sidebar className="bg-transparent lg:left-[50px] lg:top-[50px] lg:bottom-2 overflow-hidden block px-4 w-full lg:w-[20.625rem]">
      <section className="bg-card border border-sidebar-border text-sidebar-foreground md:rounded-xl shadow-[0px_0px_4px_0px_#0000001A] p-4  overflow-y-auto h-full md:h-[calc(100vh-70px)] no-scrollbar w-full">
        <div className="flex items-center mb-6 gap-3">
          <IconPlaceholder />
          <div>
            <h2 className="text-lg font-normal">StarkNet Global wallet</h2>
          </div>
        </div>
        <div className="rounded-xl p-4 bg-gray-green mb-10 min-h-[20vh] flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2">
            <span>Wallet</span>
            <IconPlaceholder className="h-7 w-7" />
          </div>
          <Button className="mt-auto w-full px-12 py-3">
            <span>Fund</span> <span>{SvgIcons["arrow-right"]()}</span>
          </Button>
        </div>
        <div className="space-y-2">
          {sidebarItems.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={activeItem?.label === item.label}
              onClick={() => setActiveItem(item)}
            />
          ))}
          <Separator className="my-10" />
          {sidebarItemstoo.map((item, i) => (
            <SidebarItem
              key={i}
              icon={item.icon}
              label={item.label}
              active={activeItem?.label === item.label}
              onClick={() => setActiveItem(item)}
            />
          ))}
        </div>
      </section>
    </Sidebar>
  );
};

export default GWSidebar;
