import Sidebar from "../components/Sidebar";

type Props = {};

function TradeDashboard({}: Props) {
  return (
    <div className="w-full items-start bg-transparent flex flex-row h-auto">
      <Sidebar />
      <div className=""></div>
    </div>
  );
}

export default TradeDashboard;
