export interface StakingData {
  stakingSeries: string;
  ognDeposited: number;
  ethInRewardsPool: number;
  ognInRewardsPool: number;
}

import { requestOgnBalanceForWallet } from "./requestGovernanceWalletBalances";

const requestStakingData = async (): Promise<StakingData> => {
  const response = await fetch("https://api.story.xyz/api/environment");
  const { stakingSeries } = await response.json();

  const ognDeposited = await requestOgnBalanceForWallet(stakingSeries);

  return { stakingSeries, ognDeposited };
};

export default requestStakingData;
