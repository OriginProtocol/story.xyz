import { Button, Typography } from "@originprotocol/origin-storybook";

import {
  formatNum,
  formatEth,
  formatOgn,
  formatUSD,
  formatChange,
} from "./helpers";
import OgnLogo from "./OgnLogo";

const PriceChangeIndicator = ({
  change,
  className = "",
}: {
  change: number;
  className?: string;
}) => {
  const colorClass =
    change > 0 ? "text-green-price-change-dark" : "text-red-price-change-dark";

  return (
    <div
      className={`${className} text-sm ${
        change > 0 ? "bg-green-price-change" : "bg-red-price-change"
      } text-right py-0.5 px-1 rounded-md`}
    >
      <Typography.Body className={`${colorClass} text-sm`}>
        {change > 0 ? "▲" : "▼"} {formatChange(change)}%
      </Typography.Body>
    </div>
  );
};

const StatHeading = ({ title }: { title: string }) => (
  <Typography.Body className="text-sm lg:text-md text-gray-stats uppercase font-bold">
    {title}
  </Typography.Body>
);

const AddToWallet = ({ className }: { className?: string }) => (
  <a
    href="#"
    className={`text-white text-md mt-3 flex justify-center items-center ${className}`}
  >
    Add to wallet
    <span role="img" aria-label="plus-circle" className="ml-2">
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="plus-circle"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z"></path>
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
      </svg>
    </span>
  </a>
);

const TokenStats = ({
  circulatingOgn,
  totalOgn,
  ognPrice,
  ethInRewardsPool,
  ognInRewardsPool,
  ogn24hChange,
  marketCap,
}: {
  circulatingOgn: number;
  totalOgn: number;
  ognPrice: number;
  ognDeposited: number;
  ethInRewardsPool: number;
  ognInRewardsPool: number;
  ogn24hChange: number;
  marketCap: number;
}) => {
  return (
    <div className="px-9 sm:py-24 py-8 bg-blue-stats">
      <div className="flex flex-wrap md:max-w-screen-xl justify-items-start mx-auto">
        <div className="w-full md:w-1/2">
          <div className="flex gap-4">
            <OgnLogo size={40} className="sm:hidden block" />
            <OgnLogo className="hidden sm:block" />
            <Typography.H3 className=" text-white">
              Origin Token <span className="text-xs sm:text-2xl">(OGN)</span>
            </Typography.H3>
          </div>
          <Typography.Body className="text-white text-xl mt-4 hidden sm:block">
            OGN is the governance token for the Origin Story platform and can be
            staked for ETH rewards.
          </Typography.Body>
          <AddToWallet className="hidden sm:flex sm:justify-start" />
        </div>
        <div className="w-full md:w-1/2 mt-8 sm:mt-0 flex flex-wrap sm:justify-end justify-start items-start gap-6">
          <div className="grid grid-cols-1 justify-items-start sm:justify-items-end">
            <Typography.H3 className="text-white">${ognPrice}</Typography.H3>
            <PriceChangeIndicator change={ogn24hChange} className="mt-1 mb-3" />
            <StatHeading title="Rewards Pool" />
            <Typography.Body className="text-sm lg:text-md text-white">
              {formatEth(ethInRewardsPool)} ETH + {formatOgn(ognInRewardsPool)}{" "}
              OGN
            </Typography.Body>
          </div>
          <div className="grid gap-y-3 gap-x-5 text-center grid-cols-2 sm:grid-cols-1">
            <Button
              type="primary"
              webProperty="story"
              label="Buy OGN"
              className="font-normal text-base md:text-md from-white to-white text-gray-900 px-8"
              size="medium"
              href="https://app.uniswap.org/#/swap?outputCurrency=0x8207c1ffc5b6804f6024322ccf34f29c3541ae26"
              target="_blank"
              rel="noreferrer"
            />
            <Button
              type="primary"
              webProperty="story"
              label="Stake OGN"
              className="from-pink-600 to-rose-300 font-normal text-base md:text-md px-8"
              size="medium"
              href="https://app.story.xyz/stake"
              target="_blank"
              rel="noreferrer"
            />
          </div>
        </div>
      </div>
      <AddToWallet className="sm:hidden text-center mt-8" />
      <div className="flex sm:flex-row flex-col gap-y-6 gap-x-20 mt-10 sm:mt-16 justify-between md:max-w-screen-xl mx-auto">
        <TokenStat title="Market Cap" value={`$${formatUSD(marketCap)}`} />
        <TokenStat
          title="Circulating Supply"
          value={formatNum(circulatingOgn)}
        />
        <TokenStat title="Total Supply" value={formatNum(totalOgn)} />
      </div>
    </div>
  );
};

const TokenStat = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="border-l border-white border-opacity-50 pl-5 sm:pl-10 py-3">
    <StatHeading title={title} />
    <Typography.H5 className="text-white sm:text-4xl">{value}</Typography.H5>
  </div>
);

export default TokenStats;
