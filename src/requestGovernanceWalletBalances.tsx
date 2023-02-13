import { excludedWallets, Wallet } from "./helpers/excludedWallets";

const alchemyUrl = process.env.ALCHEMY_URL;

const ognContractAddress = "0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26";
const ognDecimals = 18;

async function requestOgnBalanceForWallet(address: string) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenBalances",
      params: [address],
    }),
  };

  if (!alchemyUrl) {
    console.log(
      'Alchemy URL not found. Please add it to your .env file. (e.g. ALCHEMY_URL="https://eth-mainnet.alchemyapi.io/v2/your-api-key")'
    );
    return 0;
  }

  // fetching the token balances
  const res = await fetch(alchemyUrl, options);
  const response = await res.json();

  // Getting balances from the response
  const balances = response["result"];
  const ognBalance = balances.tokenBalances.find(
    ({ contractAddress }: { contractAddress: string }) =>
      contractAddress.toLowerCase() === ognContractAddress.toLowerCase()
  )?.tokenBalance;

  return ognBalance / Math.pow(10, ognDecimals);
}

//fetching the current OGN balances for all the excluded wallets
export async function requestGovernanceWalletBalances(): Promise<Wallet[]> {
  return await Promise.all(
    excludedWallets.map(async (wallet) => {
      const balance = await requestOgnBalanceForWallet(wallet.address);
      return {
        ...wallet,
        balance,
      };
    })
  );
}
