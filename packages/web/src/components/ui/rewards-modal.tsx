import { useState } from "react";

function RewardsModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const handleCloseModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };
  return (
    <dialog
      role="dialog"
      data-slot="dialog-overlay"
      className={`absolute z-[99999]  w-screen h-screen bg-black/50 backdrop-blur-[10px] inset-0  items-center justify-center  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 ${
        isModalOpen ? "flex" : "hidden"
      }`}
    >
      <div className="bg-primary p-6 rounded-2xl border border-sidebar-border  flex flex-col items-center  max-w-[23.4rem]">
        <div className="space-y-12 flex-col flex items-center pb-12 border-b border-sidebar-border">
          <div>
            <button
              onClick={handleCloseModal}
              className="bg-sidebar-border text-accent-foreground py-2.5 px-4 rounded-full text-sm font-semibold hover:bg-sidebar-border/90 cursor-pointer focus:outline-0 outline-none transition"
            >
              Close
            </button>
          </div>
          <div>
            <img
              src="../../../public/dashboardIcons/Ellipse.svg"
              alt="Ellipse"
            />
          </div>
          <article className="text-center space-y-5">
            <h4 className="text-[1.076rem] font-normal text-foreground">
              Unlock Rewards
            </h4>
            <p className="text-lg font-normal leading-6 text-sidebar-foreground max-w-[27ch]">
              Connect your x (formerly Twitter) account to unlock rewards
            </p>
          </article>
        </div>
        <div className="pt-12">
          <button className="text-primary-text text-base font-normal bg-primary-bluegreen py-3 px-12 rounded-4xl hover:bg-primary-bluegreen/90 transition cursor-pointer outline-none">
            Continue
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default RewardsModal;
