import {
  Dialog,
 
  DialogContent,
  DialogDescription,
 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function BadgeDetails() {
  return (
    <Dialog >
      <DialogTrigger asChild>
      <Plus size={20} />
      </DialogTrigger>
      <DialogContent className=" ">
        <DialogHeader>
          <DialogTitle className="font-normal md:text-2xl text-xl lg:text-[28px]">
            Badge Details
          </DialogTitle>
          <hr className="my-4 border-t dark:border-[#314140] border-[#D9D9D9]" />
        </DialogHeader>
        <DialogDescription>
          <div className="flex flex-col items-center mt-4 mb-6">
            <div className="flex items-center md:flex-row flex-col gap-5 md:justify-between w-full">
              <div className="w-[170px] h-[170px] bg-gray-200 bg-opacity-20 rounded-full flex-shrink-0 flex items-center justify-center">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                  }}
                ></div>
              </div>

              <div className="flex flex-col items-center md:w-[70%] gap-4">
                <Button
                  variant="outline"
                  className="flex items-center px-4 py-2 rounded-full text-sm"
                >
                  <Plus size={16} className="mr-1" />
                  Flash Badge
                </Button>
                <h3 className="text-4xl font-bold">Super Duper</h3>
                <div className="p-4 rounded-lg font-[400] dark:bg-[#0A1D1C] dark:border dark:border-[#314140] text-[#9DA3AC] bg-[#F7F9FF] text-sm">
                  Beat The Playground And Earn Positive Payouts In A Casual Or
                  Ranked Game To Claim This Badge
                </div>
                <Button className="w-[50%] mx-auto py-5 mt-4 text-[#FAFAFA] rounded-full bg-gradient-to-b from-gray-300 to-[#F6F6F6]">
                  Redeem Badge
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-2xl font-bold mb-4">Description</h4>
            <p className="text-sm mb-6 text-[#9DA3AC] font-[400]">
              This Badge Is Awarded To Users Who Have Won The Playground And
              Earned Positive Payouts In A Casual Or Tanked Game In Duper
            </p>

            <Button
              variant="default"
              className="w-fit py-2 px-6 mt-2 rounded-full dark:bg-[#0EB094] text-white bg-[#2D2D2D] dark:text-white text-center font-medium"
            >
              Go To App
            </Button>
          </div>
        </DialogDescription>
       
      </DialogContent>
    </Dialog>
  );
}