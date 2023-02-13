import { Typography } from "@originprotocol/origin-storybook";

interface Wallet {
  name: string;
  address: string;
  balance: number;
}
const wallets: Wallet[] = [
  {
    name: "Foundation Reserves",
    address: "0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899",
    balance: 428680937,
  },
  {
    name: "Team Distribution",
    address: "0x2eae0cae2323167abf78462e0c0686865c67a655",
    balance: 678289,
  },
  {
    name: "Investor Distribution",
    address: "0xfe730b3cf80ca7b31905f70241f7c786baf443e3",
    balance: 428680937,
  },
  {
    name: "Distribution Staging",
    address: "0x12d7ef3c933d091210cd931224ead45d9cfddde0",
    balance: 428680937,
  },
  {
    name: "Partnerships",
    address: "0xbc0722eb6e8ba0217aeea5694fe4f214d2e53017",
    balance: 428680937,
  },
  {
    name: "Ecosystem Growth",
    address: "0x2d00c3c132a0567bbbb45ffcfd8c6543e08ff626",
    balance: 428680937,
  },
];

const ExcludedWallets = () => {
  return (
    <div className="p-2 sm:p-9 text-center mb-16">
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
            {wallets.map((wallet) => (
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
                  <Typography.Body>{wallet.balance} OGN</Typography.Body>
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
