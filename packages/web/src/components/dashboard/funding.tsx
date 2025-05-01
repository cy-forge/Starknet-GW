import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";
import IconPlaceholder from "../shared/IconPlaceholder";
import { DialogContent } from "@radix-ui/react-dialog";

interface FundingWarningProps {
  title: string;
  desc: string;
}

export function FundingWarning({ title, desc }: FundingWarningProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="">funding Warning modal</Button>
      </DialogTrigger>
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay className="bg-white/10 !backdrop-blur-[10px]" />
        <DialogContent
          data-slot="dialog-content"
          className={
            "bg-background dark:bg-[#001413] rounded-2xl max-w-[calc(100%-1.5rem)] md:max-w-[435px] p-6 w-full data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] border border-[#DEDEDE] dark:border-[#314140] shadow-lg duration-200 "
          }
        >
          <DialogDescription>
            <div className="space-y-10 md:space-y-12 text-center flex flex-col items-center">
              <IconPlaceholder className="size-40 sm:size-[230px] shadow-funding border-[5px] border-[#FDEEEE] dark:bg-sidebar-border dark:border-sidebar-border" />
              <div>
                <p className=" text-lg text-primary-text mb-5">{title}</p>
                <div className="border rounded-xl p-3 bg-[#FFE7E7] dark:bg-[#0A1D1C] dark:border-sidebar-border border-[#EDEFF3]">
                  <p className="text-sm text-[#FF4141] ">{desc}</p>
                </div>
              </div>
              <hr className="h-[1px] dark:text-sidebar-border w-full" />
            </div>
          </DialogDescription>
          <DialogClose className="mt-10 sm:mt-12 w-fit mx-auto ">
            <Button
              variant="default"
              className="text-base px-12 w-fit h-[42px] capitalize"
            >
              I understand
            </Button>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
