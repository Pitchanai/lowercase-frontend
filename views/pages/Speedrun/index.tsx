import { Connect } from "views/common/connect";
import { CheckAmount } from "./CheckAmount";
import { Donate } from "./Donate";
import { Leader } from "./Leader";

export const Speedrun = () => {
  return (
    <>
      <Connect />
      <CheckAmount />
      <Donate />
      <Leader />
    </>
  );
};
