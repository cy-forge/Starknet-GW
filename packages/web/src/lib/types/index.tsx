import { JSX } from "react";

export type FundingOption = {
  icon: string | (() => JSX.Element);
  title: string;
  description?: string;
}