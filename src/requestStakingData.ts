interface StakingRewardData {
  ethInRewardsPool: number;
  ognInRewardsPool: number;
}

interface StakingDepositData {
  stakingSeries: string;
  ognDeposited: number;
}

export interface StakingData extends StakingRewardData, StakingDepositData {}

import { requestOgnBalanceForWallet } from "./requestGovernanceWalletBalances";

const ethDecimals = 18;
const ognDecimals = 18;

async function getRewards(): Promise<StakingRewardData> {
  const response = await fetch("https://api.story.xyz/api/staking/rewards");
  const { ETH, OGN } = await response.json();

  return {
    ethInRewardsPool: ETH / Math.pow(10, ethDecimals),
    ognInRewardsPool: OGN / Math.pow(10, ognDecimals),
  };
}

async function getStaked(): Promise<StakingDepositData> {
  const response = await fetch("https://api.story.xyz/api/environment");
  const { stakingSeries } = await response.json();

  const ognDeposited = await requestOgnBalanceForWallet(stakingSeries);

  return { ognDeposited, stakingSeries };
}

/**
 * Grabs the amount of ETH and OGN in the rewards pools, as well as the amount of OGN staked
 * @returns {Promise<StakingData>}
 */
const requestStakingData = async (): Promise<StakingData> => {
  try {
    const [rewards, ognDeposited] = await Promise.all([
      getRewards(),
      getStaked(),
    ]);

    return { ...rewards, ...ognDeposited };
  } catch (e) {
    console.log("Something went wrong while fetching staking data");
    console.error(e);
    return {
      ethInRewardsPool: 0,
      ognInRewardsPool: 0,
      stakingSeries: "",
      ognDeposited: 0,
    };
  }
};

export default requestStakingData;
