import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Button } from "@/components/ui/button";
import IconPlaceholder from "../shared/IconPlaceholder";
import { Input } from "../ui/input";

export function Account() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent">
          <IconPlaceholder className="h-7 w-7" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-normal md:text-2xl text-xl  lg:text-[28px] ">
            Account Details
          </DialogTitle>
          <hr className="my-4 border-t dark:border-[#314140] border-[#D9D9D9]" />
          <DialogDescription>
            <div className="flex flex-col items-start gap-6">
              <div className="w-full gap-2 py-3 flex flex-col">
                <p className="text-lg font-normal capitalize dark:text-[#F4F6FA] text-[#2D2D2D] ">
                  Sign in Methods
                </p>
                <div className="w-full h-auto flex relative ">
                  <Input
                    className="h-12 w-full pl-12 dark:placeholder:text-[#9596A0]"
                    placeholder="Placeholder"
                  />
                  <div className="bg-[#D9D9D9] rounded-full h-4 w-4  absolute top-4 left-4" />
                </div>
              </div>
              <div className="flex-col  flex gap-2">
                <p className="text-lg font-normal capitalize text-[#2D2D2D] dark:text-[#F4F6FA] ">
                  Wallets
                </p>

                <p className="text-[#9DA3AC] capitalize font-Sansation font-normal text-lg">
                  You have not linked any wallets to your abstract global wallet
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full items-center flex mt-5  justify-center">
          <DialogClose asChild>
            <Button variant="default">Link Wallet</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
