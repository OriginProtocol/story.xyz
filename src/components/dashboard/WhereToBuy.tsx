import Image from "next/future/image";
import { Button, Typography } from "@originprotocol/origin-storybook";

interface Exchange {
  name: string;
  url: string;
  logo: string;
}

const exchanges: Exchange[] = [
  {
    name: "1Inch",
    url: "https://app.1inch.io/#/1/simple/swap/ETH/OGN",
    logo: "/logos/exchanges/1inch.svg",
  },
  {
    name: "Uniswap",
    url: "https://app.uniswap.org/#/swap?outputCurrency=0x8207c1ffc5b6804f6024322ccf34f29c3541ae26",
    logo: "/logos/exchanges/uniswap.svg",
  },
  {
    name: "SushiSwap",
    url: "https://app.sushi.com/swap?outputCurrency=0x8207c1ffc5b6804f6024322ccf34f29c3541ae26",
    logo: "/logos/exchanges/sushiswap.svg",
  },
  {
    name: "Coinbase",
    url: "https://www.coinbase.com/price/origin-token",
    logo: "/logos/exchanges/coinbase.svg",
  },
  {
    name: "Binance",
    url: "https://www.binance.com/en/trade/OGN_USDT",
    logo: "/logos/exchanges/binance.svg",
  },
  {
    name: "OKEx",
    url: "https://www.okex.com/spot/trade#product=OGN-USDT",
    logo: "/logos/exchanges/okx.svg",
  },
  {
    name: "Balancer",
    url: "https://pools.balancer.exchange/#/pool/0xae1019cfc59dc21a2395c8b38a6f6d0df61d2c22/",
    logo: "/logos/exchanges/balancer.svg",
  },
  {
    name: "KuCoin",
    url: "https://www.kucoin.com/trade/OGN-USDT",
    logo: "/logos/exchanges/kucoin.svg",
  },
  {
    name: "Kraken",
    url: "https://www.kraken.com/prices/origin-protocol?quote=usd",
    logo: "/logos/exchanges/kraken.svg",
  },
  {
    name: "Huobi",
    url: "https://www.huobi.com/",
    logo: "/logos/exchanges/huobi.svg",
  },
  {
    name: "Crypto.com",
    url: "https://crypto.com/",
    logo: "/logos/exchanges/cryptocom.svg",
  },
];

const Exchange = ({ name, url, logo }: Exchange) => {
  return (
    <a href={url}>
      <Image
        key={name}
        src={logo}
        className="exchanges w-full h-auto"
        alt={`${name} logo`}
        width="0"
        height="0"
      />
    </a>
  );
};

const WhereToBuy = () => {
  return (
    <div className="p-9 text-center">
      <Typography.H3 className="mt-6" style={{ color: "#1E293B" }}>
        Where to buy OGN
      </Typography.H3>
      <Typography.Body className="mt-6" style={{ color: "#475569" }}>
        Available on all major centralized and decentralized exchanges (50+)
      </Typography.Body>
      <div className="mt-10 mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center justify-center items-center gap-x-16 gap-y-20">
        {exchanges.map((exchange) => (
          <Exchange key={exchange.name} {...exchange} />
        ))}
      </div>
      <div className="flex justify-center flex-wrap gap-y-5 gap-x-5 justify-items-center">
        <Button
          type="primary"
          webProperty="story"
          label="View All on CoinGecko"
          className="w-full sm:w-auto font-normal text-base md:text-2xl"
          size="medium"
          href="https://www.coingecko.com/en/coins/origin-protocol#markets"
          target="_blank"
          rel="noreferrer"
        />
        <Button
          type="primary"
          webProperty="story"
          label="View All on CoinMarketCap"
          className="w-full sm:w-auto font-normal text-base md:text-2xl"
          size="medium"
          href="https://coinmarketcap.com/currencies/origin-protocol/markets/"
          target="_blank"
          rel="noreferrer"
        />
      </div>
    </div>
  );
};

export default WhereToBuy;
