import Image from "next/future/image";

const EthLogo = ({ className = "" }: { className?: string }) => {
  return (
    <Image
      src="/eth-logo.svg"
      width="60"
      height="60"
      alt="Ethereum logo"
      className={className}
    />
  );
};

export default EthLogo;
