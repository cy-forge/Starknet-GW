import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import IconPlaceholder from "../shared/IconPlaceholder";
import { useEffect, useState } from "react";

const SuperDuper = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 82,
    minutes: 48,
    seconds: 3,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else {
          if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          } else {
            clearInterval(timer);
          }
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-6 lg:py-[68px] dark:bg-[#0A1D1C] border dark:border-[#314140] border-[#DEDEDE] w-fit lg:w-full max-w-[880px] bg-transparent">
      <div className="flex flex-col md:flex-row gap-6 lg:px-[26px] items-center">
        <div className="order-1 md:order-[0] flex text-center flex-col items-center gap-5 max-w-[367px]">
          {/* countdown */}
          <div className=" space-y-3">
            <div className="flex gap-2 text-sm md:text-base items-center">
              <p className="dark:bg-[#314140] bg-white border-[#D9D9D9] p-2 rounded-md">
                {timeLeft.hours}h
              </p>
              <p className="dark:bg-[#314140] bg-white border-[#D9D9D9] p-2 rounded-md">
                {timeLeft.minutes}m
              </p>
              <p className="dark:bg-[#314140] bg-white border-[#D9D9D9] p-2 rounded-md">
                {timeLeft.seconds}s
              </p>
            </div>

            <Button
              variant="outline"
              className="flex items-center gap-2 py-3 h-[43px] border-[#2D2D2D] dark:border-[#314140] text-sm md:text-base bg-transparent dark:bg-transparent mx-auto"
            >
              <Plus className="dark:text-[#F4F6FA] size-4  text-[#2D2D2D]" />
              Flash Badge
            </Button>
          </div>

          {/* title */}
          <div>
            <p className="text-primary-text font-medium text-4xl md:text-5xl mb-1.5">
              Super Duper
            </p>
            <p className="text-grayish text-sm md:text-base">
              This badge is awarded to users who have won the playground and
              earned positive payouts in a casual or ranked game in duper.
            </p>
          </div>

          <Button className=" h-[43px] text-sm md:text-base px-8 lg:px-12 bg-[#D1D1D1] dark:bg-tealish dark:hover:bg-tealish/80 hover:bg-[#D1D1D1]/80">
            View Details
          </Button>
        </div>

        <IconPlaceholder className=" lg:max-w-[389px] size-52 lg:h-[389px] lg:w-full  rounded-full" />
      </div>
    </Card>
  );
};

export default SuperDuper;
