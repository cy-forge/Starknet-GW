import { SvgIcons } from "@/assets/SvgIcons";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { DialogContent } from "@radix-ui/react-dialog";
import IconPlaceholder from "../shared/IconPlaceholder";

function TwitterLinkedModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>connnect twitter</Button>
      </DialogTrigger>
      <DialogPortal data-slot="dialog-portal">
        <DialogOverlay>
          <DialogContent
            data-slog="dialog-content"
            className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%]  duration-200"
          >
            <div className="bg-primary p-6 rounded-2xl border border-sidebar-border  flex flex-col items-center  max-w-[28.25rem] w-full">
              <div className="space-y-12 flex-col flex items-center pb-12 border-b border-sidebar-border">
                <div>
                  <DialogClose>
                    <button className="bg-sidebar-border text-accent-foreground py-2.5 px-4 rounded-full text-sm font-semibold hover:bg-sidebar-border/90 cursor-pointer focus:outline-0 outline-none transition">
                      Close
                    </button>
                  </DialogClose>
                </div>
                <div>
                  <IconPlaceholder className="size-40 sm:size-[230px] shadow-funding border-[5px] border-[#FDEEEE] dark:bg-sidebar-border dark:border-sidebar-border" />
                </div>
                <article className="text-center space-y-5">
                  <h4 className="text-[1.076rem] font-normal text-foreground">
                    Twitter Linked!{" "}
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-lg font-normal leading-6 text-sidebar-foreground ">
                      Congrats! You have linked your Twitter.{" "}
                    </p>
                    <p className="text-lg font-normal leading-6 text-sidebar-foreground ">
                      You’ve unlocked Rewards and much more!{" "}
                    </p>
                  </div>
                </article>
              </div>
              <div className="pt-12 flex gap-4.5">
                <button className="text-[#2d2d2d] border-[#2d2d2d] dark:hover:border-[#2d2d2d] dark:text-foreground focus:bg-[#a8a8a8] text-base font-normal bg-transparent border dark:border-sidebar-border py-3 px-12 rounded-4xl  transition cursor-pointer outline-none hover:border-[#574d4d] flex  gap-2 items-center justify-center">
                  <span>Follow us on</span> {SvgIcons.twitterLogo()}
                </button>
                <button className="text-white text-base font-normal bg-primary-bluegreen py-3 px-12 rounded-4xl hover:bg-primary-bluegreen/90 transition cursor-pointer outline-none">
                  Continue
                </button>
              </div>
            </div>
          </DialogContent>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
}

export default TwitterLinkedModal;
