import Image from "next/future/image";

const OgnLogo = ({
  className = "",
  size = 60,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <Image
      src="/origin-logo.svg"
      width={size}
      height={size}
      alt="Origin logo"
      className={className}
    />
  );
};

export default OgnLogo;
