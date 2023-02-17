export interface Wallet {
  name: string;
  address: string;
  balance?: number;
}

export const excludedWallets: Wallet[] = [
  {
    name: "Foundation Reserves",
    address: "0xbe2ab3d3d8f6a32b96414ebbd865dbd276d3d899",
  },
  {
    name: "Team Distribution",
    address: "0x2eae0cae2323167abf78462e0c0686865c67a655",
  },
  {
    name: "Investor Distribution",
    address: "0xfe730b3cf80ca7b31905f70241f7c786baf443e3",
  },
  {
    name: "Distribution Staging",
    address: "0x12d7ef3c933d091210cd931224ead45d9cfddde0",
  },
  {
    name: "Partnerships",
    address: "0xbc0722eb6e8ba0217aeea5694fe4f214d2e53017",
  },
  {
    name: "Ecosystem Growth",
    address: "0x2d00c3c132a0567bbbb45ffcfd8c6543e08ff626",
  },
];
