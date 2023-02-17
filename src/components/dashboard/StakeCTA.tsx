import {
  Button,
  GradientText,
  Typography,
} from "@originprotocol/origin-storybook";
import Image from "next/future/image";
import numeral from "numeral";
import OgnLogo from "./OgnLogo";
import EthLogo from "./EthLogo";
import { formatEth, formatOgn } from "./helpers";

const RewardsPool = ({
  title,
  amount,
  logo,
}: {
  title: string;
  amount: string;
  logo?: React.ReactNode;
}) => {
  return (
    <div className="border border-white rounded-md w-full sm:w-5/12 lg:w-96 px-6 py-6 bg-white bg-opacity-10 text-center sm:text-left">
      <Typography.Body2 className="text-white uppercase">
        {title}
      </Typography.Body2>
      <div className="text-white flex gap-4 justify-center sm:justify-start uppercase">
        {logo}
        <Typography.H1>{amount}</Typography.H1>
      </div>
    </div>
  );
};
const StakeCTA = ({
  ognDeposited,
  ethInRewardsPool,
  ognInRewardsPool,
}: {
  ognDeposited: number;
  ethInRewardsPool: number;
  ognInRewardsPool: number;
}) => {
  return (
    <div className="px-5 md:px-9 py-24 text-center relative overflow-hidden bg-blue-stats">
      <Typography.H2 className=" text-white">Stake OGN</Typography.H2>
      <Typography.H2>
        <GradientText
          webProperty="story"
          text="earn rewards"
          gradients={["#AFA1FF", "#F68BFF", "#FD9AC2"]}
        />
      </Typography.H2>
      <Typography.H6 className="my-8 text-white opacity-75">
        Earn 100% of all marketplace fees when you stake your OGN
      </Typography.H6>

      <div className="flex flex-wrap items-center justify-center my-14 gap-2">
        <RewardsPool
          title="Total ETH in rewards pool"
          amount={formatEth(ethInRewardsPool)}
          logo={<EthLogo />}
        />
        <RewardsPool
          title="Total OGN in rewards pool"
          amount={formatOgn(ognInRewardsPool)}
          logo={<OgnLogo />}
        />
      </div>

      <Typography.Body2 className="text-white font-bold">
        Total OGN deposited
      </Typography.Body2>

      <Typography.H3 className="text-white mt-2 mb-16">
        {numeral(ognDeposited).format("0,0")}
      </Typography.H3>
      <Button
        type="primary"
        webProperty="story"
        label="Earn Rewards"
        className="w-full sm:w-auto from-pink-600 to-rose-300 font-normal text-base md:text-2xl relative z-20"
        size="medium"
        href="https://app.story.xyz/stake"
        target="_blank"
        rel="noreferrer"
      />
      <div
        className="absolute z-10"
        style={{ right: "calc(50% - 69rem)", top: "32rem" }}
      >
        <Image
          src="/splines-00021.png"
          width="1156"
          height="1140"
          alt="Spline 21"
          className="hidden sm:block"
        />
      </div>
    </div>
  );
};

export default StakeCTA;
