import {
  Button,
  Card,
  CardProps,
  Footer,
  GradientText,
  Header,
  IconFormatted,
  LinkFormatted,
  MappedLink,
  Typography,
} from "@originprotocol/origin-storybook";
import Head from "next/head";
import Image from "next/future/image";
import requestCmsData from "../src/requestCmsData";
import requestOgnData from "../src/requestOgnData";
import styles from "../src/styles/Home.module.css";
import Community, { Social } from "../src/components/Community";
import LatestStories from "../src/components/LatestStories";
import { Article, SeoFormatted } from "../src/components/types";
import { fetchAPI } from "../src/helpers/fetchApi";
import transformSeo from "../src/helpers/transformSeo";
import Seo from "../src/components/Seo";

import oneinch from "../public/logos/exchanges/1inch.svg";
import uniswap from "../public/logos/exchanges/uniswap.svg";
import sushiswap from "../public/logos/exchanges/sushiswap.svg";
import coinbase from "../public/logos/exchanges/coinbase.svg";
import binance from "../public/logos/exchanges/binance.svg";
import okx from "../public/logos/exchanges/okx.svg";
import balancer from "../public/logos/exchanges/balancer.svg";
import kucoin from "../public/logos/exchanges/kucoin.svg";
import kraken from "../public/logos/exchanges/kraken.svg";
import huobi from "../public/logos/exchanges/huobi.svg";
import cryptocom from "../public/logos/exchanges/cryptocom.svg";

interface CollectionProps extends CardProps {
  img: string;
  imgAlt: string;
  thumbnail: string;
  thumbnailAlt?: string;
}

const TokenStats = ({
  circulatingOgn,
  totalOgn,
  ognPrice,
}: {
  circulatingOgn: number;
  totalOgn: number;
  ognPrice: number;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <Typography.H5 as="h3">Marketplaces</Typography.H5>
    </div>
  );
};

interface Exchange {
  name: string;
  url: string;
  logo: string;
}

const exchanges: Exchange[] = [
  {
    name: "1Inch",
    url: "https://app.1inch.io/#/1/simple/swap/ETH/OGN",
    logo: oneinch,
  },
  {
    name: "Uniswap",
    url: "https://app.uniswap.org/#/swap?outputCurrency=0x8207c1ffc5b6804f6024322ccf34f29c3541ae26",
    logo: uniswap,
  },
  {
    name: "SushiSwap",
    url: "https://app.sushi.com/swap?outputCurrency=0x8207c1ffc5b6804f6024322ccf34f29c3541ae26",
    logo: sushiswap,
  },
  {
    name: "Coinbase",
    url: "https://www.coinbase.com/price/origin-token",
    logo: coinbase,
  },
  {
    name: "Binance",
    url: "https://www.binance.com/en/trade/OGN_USDT",
    logo: binance,
  },
  {
    name: "OKEx",
    url: "https://www.okex.com/spot/trade#product=OGN-USDT",
    logo: okx,
  },
  {
    name: "Balancer",
    url: "https://pools.balancer.exchange/#/pool/0xae1019cfc59dc21a2395c8b38a6f6d0df61d2c22/",
    logo: balancer,
  },
  {
    name: "KuCoin",
    url: "https://www.kucoin.com/trade/OGN-USDT",
    logo: kucoin,
  },
  {
    name: "Kraken",
    url: "https://www.kraken.com/prices/origin-protocol?quote=usd",
    logo: kraken,
  },
  {
    name: "Huobi",
    url: "https://www.huobi.com/",
    logo: huobi,
  },
  {
    name: "Crypto.com",
    url: "https://crypto.com/",
    logo: cryptocom,
  },
];

const Exchange = ({ name, url, logo }: Exchange) => {
  return (
    <a href={url}>
      <Image key={name} src={logo} className="exchanges" alt={`${name} logo`} />
    </a>
  );
};

const WhereToBuy = () => {
  return (
    <div className="p-9 text-center mb-16">
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
          href="mailto: partnerships@story.xyz"
          target="_blank"
          rel="noreferrer"
        />
        <Button
          type="primary"
          webProperty="story"
          label="View All on CoinMarketCap"
          className="w-full sm:w-auto font-normal text-base md:text-2xl"
          size="medium"
          href="mailto: partnerships@story.xyz"
          target="_blank"
          rel="noreferrer"
        />
      </div>
    </div>
  );
};

const EthLogo = () => {
  return (
    <Image src="/eth-logo.svg" width="60" height="60" alt="Ethereum logo" />
  );
};

const OgnLogo = () => {
  return (
    <Image src="/origin-logo.svg" width="60" height="60" alt="Origin logo" />
  );
};

const RewardsPool = ({
  title,
  amount,
  logo,
}: {
  title: string;
  amount: string;
  logo?: React.ReactNode;
}) => {
  return (
    <div className="border border-white rounded-md w-full sm:w-5/12 lg:w-96 px-6 py-6 bg-white bg-opacity-10 text-left">
      <Typography.Body2 className="text-white uppercase">
        {title}
      </Typography.Body2>
      <div className="text-white flex justify-items-center gap-4">
        {logo}
        <Typography.H1>{amount}</Typography.H1>
      </div>
    </div>
  );
};

const StakeCTA = ({ ognDeposited, ethInRewardsPool, ognInRewardsPool }) => {
  return (
    <div
      className="px-9 py-24 text-center relative overflow-hidden"
      style={{ backgroundColor: "#0074F0" }}
    >
      <Typography.H2 className=" text-white">Stake OGN</Typography.H2>
      <Typography.H2>
        <GradientText
          webProperty="story"
          text="earn rewards"
          gradients={["#AFA1FF", "#F68BFF", "#FD9AC2"]}
        />
      </Typography.H2>
      <Typography.H6 className="my-8 text-white opacity-75 ">
        Earn 100% of all marketplace fees when you stake your OGN
      </Typography.H6>

      <div className="flex flex-wrap items-center justify-center my-14 gap-2">
        <RewardsPool
          title="Total ETH in rewards pool"
          amount={ethInRewardsPool}
          logo={<EthLogo />}
        />
        <RewardsPool
          title="Total OGN in rewards pool"
          amount={ognInRewardsPool}
          logo={<OgnLogo />}
        />
      </div>

      <Typography.Body2 className="text-white font-bold">
        Total OGN deposited
      </Typography.Body2>

      <Typography.H3 className="text-white mt-2 mb-16">
        {ognDeposited}
      </Typography.H3>
      <Button
        type="primary"
        webProperty="story"
        label="Earn Rewards"
        className="w-full sm:w-auto from-pink-600 to-rose-300 font-normal text-base md:text-2xl"
        size="medium"
        href="https://app.story.xyz/stake"
        target="_blank"
        rel="noreferrer"
      />
      <div
        className="absolute"
        style={{ right: "calc(50% - 69rem)", top: "32rem" }}
      >
        <Image
          src="/splines-00021.png"
          width="1156"
          height="1140"
          alt="Spline 21"
          className="hidden sm:block -z-10"
        />
      </div>
    </div>
  );
};

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
    <div className="p-9 text-center mb-16">
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
                    <a href={`https://etherscan.io/address/${wallet.address}`}>
                      {wallet.name}
                    </a>
                  </Typography.Body>
                </td>
                <td className="p-2 hidden md:table-cell">
                  <Typography.Body>
                    <a href={`https://etherscan.io/address/${wallet.address}`}>
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

const Dashboard = ({
  links,
  collections,
  drops,
  ognInfo,
  socials,
  articles,
  seo,
}: {
  links: MappedLink<LinkFormatted<IconFormatted>>[];
  collections: CollectionProps[];
  drops: CollectionProps[];
  ognInfo: {
    circulatingOgn: number;
    totalOgn: number;
    ognPrice: number;
  };
  socials: Social[];
  articles: Article[];
  seo: SeoFormatted;
}) => {
  console.log(ognInfo);
  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>Story.xyz</title>
        <meta
          name="description"
          content="Origin is a platform for building decentralized marketplaces on the blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Seo seo={seo} />
      <Header webProperty="story" mappedLinks={links} />

      <main style={{ backgroundColor: "#F6F8FE" }}>
        <div className="max-w-screen-xl mx-auto px-9">
          <section className="mb-24 relative">
            <WhereToBuy />
          </section>
        </div>
        <StakeCTA
          ognDeposited="94,345,435"
          ethInRewardsPool="53.65"
          ognInRewardsPool="215K"
        />
        <ExcludedWallets />
      </main>
      <div className="relative z-10">
        <Footer webProperty="story" />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { links, collections, drops, articles } = await requestCmsData();
  const ognInfo = await requestOgnData();
  const socialRes = await fetch(
    `${process.env.NEXT_LEGACY_WEBSITE_HOST}/social-stats`
  );
  const socials = await socialRes.json();
  const seoRes = await fetchAPI("/story/page/en/%2F");

  const sortedArticles = articles.sort((a: Article, b: Article) =>
    (b.publishBackdate || b.publishedAt).localeCompare(
      a.publishBackdate || a.publishedAt
    )
  );

  return {
    props: {
      links,
      collections,
      drops,
      ognInfo,
      socials: socials.stats,
      articles: sortedArticles,
      seo: transformSeo(seoRes.data),
    },
    revalidate: 5 * 60, // revalidate every 5 minutes
  };
}

export default Dashboard;
