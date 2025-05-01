import { JSX } from "react";

export type FundingOption = {
  icon: string | (() => JSX.Element);
  title: string;
  description?: string;
};
export type RewardsModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};
