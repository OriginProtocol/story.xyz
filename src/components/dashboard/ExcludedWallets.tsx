import { Typography } from "@originprotocol/origin-storybook";
import { excludedWallets, Wallet } from "../../helpers/excludedWallets";
import { formatNum } from "./helpers";

const ExcludedWallets = ({
  walletBalances = excludedWallets,
}: {
  walletBalances: Wallet[];
}) => {
  return (
    <div className="p-2 sm:p-9 text-center pb-16">
      <Typography.H3 className="mt-6" style={{ color: "#1E293B" }}>
        Wallets excluded from circulating supply
      </Typography.H3>
      <Typography.Body className="mt-6" style={{ color: "#475569" }}>
        Circulating supply is calculated as the total supply minus the OGN
        balances of the following wallets:
      </Typography.Body>
      <div className="flex justify-center mt-4">
        <table className="w-full lg:max-w-6xl border-collapse text-left">
          <tbody>
            {walletBalances.map((wallet) => (
              <tr key={wallet.name}>
                <td className="p-2">
                  <Typography.Body className="font-bold">
                    <a
                      href={`https://etherscan.io/address/${wallet.address}`}
                      className="hover:underline"
                    >
                      {wallet.name}
                    </a>
                  </Typography.Body>
                </td>
                <td className="p-2 hidden md:table-cell">
                  <Typography.Body>
                    <a
                      href={`https://etherscan.io/address/${wallet.address}`}
                      className="hover:underline text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {wallet.address}
                    </a>
                  </Typography.Body>
                </td>
                <td className="p-2 text-right">
                  <Typography.Body>
                    {formatNum(wallet.balance || 0)} OGN
                  </Typography.Body>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcludedWallets;
