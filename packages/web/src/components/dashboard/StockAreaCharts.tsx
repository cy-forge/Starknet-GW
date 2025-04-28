import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function StockChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const result = [];
      const baseValue = 150;
      const startDate = new Date("2024-01-01");
      let currentValue = baseValue;

      for (let i = 0; i < 30; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        const moveType = Math.random();
        let variance;

        if (moveType > 0.95) {
          variance = -Math.random() * 60;
        } else if (moveType > 0.9) {
          variance = Math.random() * 60;
        } else {
          variance = Math.random() * 60 - 30;
        }
        currentValue = currentValue + variance;
        currentValue = Math.max(currentValue, 20);

        result.push({
          date: date.toISOString().split("T")[0],
          close: Math.round(currentValue * 100) / 100,
        });
      }

      return result;
    };

    setData(generateData());
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-teal-900 text-white p-2 border border-white rounded shadow-lg">
          <p className="font-bold">${payload[0].value.toFixed(2)}</p>
          <p className="text-xs">{label}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={true}
            horizontal={false}
            verticalPoints={[50, 100, 150, 200, 250, 300, 350, 400, 450, 500]}
            strokeDasharray="6 6"
            stroke="#75daad"
            strokeOpacity={0.4}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tick={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />

          <defs>
            <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#75daad" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#0A211F" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="close"
            stroke="none"
            fill="url(#colorClose)"
            fillOpacity={1}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#75daad"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#75daad",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
