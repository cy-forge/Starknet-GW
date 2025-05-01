import { Card } from "../ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { SvgIcons } from "@/assets/SvgIcons";

export const XpWeeklyRecap = () => {
  return (
    <Card className="p-6 max-w-[436px] w-full border dark:border-[#314140] border-[#DEDEDE] dark:bg-[#0A1D1C] ">
        <p className=" text-xl md:text-[28px] mb-6 md:mb-12 text-primary-text">
          XP Weekly Recap
        </p>

        <div className="text-primary-text  gap-2 flex items-end  ">
          <p className="text-xl md:text-[28px]">+0</p>{" "}
          <p className="text-[#1E1E1E] text-sm md:text-base shadow-text-xp py-1 px-2 md:p-2 border border-black rounded-md w-fit">
            XP
          </p>
        </div>

        <p className="text-grayish mb-3 text-sm md:text-base mt-2">
          Earned For Week 4
        </p>

        <ResponsiveContainer width="100%" height={169}>
          <BarChart data={data} barGap={12}>
            <XAxis dataKey="week" axisLine={false} tickLine={false} />

            <Tooltip
              cursor={{ fill: "transparent" }}
              content={<CustomTooltip />}
            />

            <Bar dataKey="value">
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  radius={9}
                  className="fill-[#F5F7FB] dark:fill-transparent dark:stroke-[#314140] stroke-[#F0F0F1]"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-6 md:mt-12 border dark:border-[#314140] border-[#EDEFF3] bg-[#F7F9FF] dark:bg-[#0A1D1C] p-3 flex items-center gap-6 rounded-md">
          {SvgIcons["polygon"]()}

          <p className="dark:text-[#F4F6FA] capitalize text-[#2D2D2D] text-sm md:text-base">
            Check back on Tuesday to see how you’ve done this week!
          </p>
        </div>
   
    </Card>
  );
};

const data = [
  { week: "W1", value: 4000 },
  { week: "W2", value: 4000 },
  { week: "W3", value: 4000 },
  { week: "W4", value: 4000 },
  { week: "W5", value: 4000 },
  { week: "W6", value: 4000 },
  { week: "W7", value: 4000 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-card text-primary-text p-2 border border-sidebar rounded shadow-accent-foreground">
        <p className="label">{`Week: ${label}`}</p>
        <p className="intro">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
