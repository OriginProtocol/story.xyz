import {
  Footer,
  Header,
  IconFormatted,
  LinkFormatted,
  MappedLink,
} from "@originprotocol/origin-storybook";
import Head from "next/head";
import requestCmsData from "../src/requestCmsData";
import requestOgnData from "../src/requestOgnData";
import { SeoFormatted } from "../src/components/types";
import { fetchAPI } from "../src/helpers/fetchApi";
import transformSeo from "../src/helpers/transformSeo";
import Seo from "../src/components/Seo";

import TokenStats from "../src/components/dashboard/TokenStats";
import WhereToBuy from "../src/components/dashboard/WhereToBuy";
import StakeCTA from "../src/components/dashboard/StakeCTA";
import ExcludedWallets from "../src/components/dashboard/ExcludedWallets";
import { requestGovernanceWalletBalances } from "../src/requestGovernanceWalletBalances";
import { Wallet } from "../src/helpers/excludedWallets";
import requestStakingData, { StakingData } from "../src/requestStakingData";

const Dashboard = ({
  links,
  ognInfo,
  seo,
  walletBalances,
  stakingData,
}: {
  links: MappedLink<LinkFormatted<IconFormatted>>[];
  ognInfo: {
    circulatingOgn: number;
    totalOgn: number;
    ognPrice: number;
    marketCap: number;
    ogn24hChange: number;
  };
  walletBalances: Wallet[];
  stakingData: StakingData;
  seo: SeoFormatted;
}) => {
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
        <TokenStats {...ognInfo} {...stakingData} />
        <section className="max-w-screen-xl mx-auto sm:px-9 px-0 sm:mb-24 relative">
          <WhereToBuy />
        </section>
        <StakeCTA {...stakingData} />
        <ExcludedWallets walletBalances={walletBalances} />
      </main>
      <div className="relative z-10">
        <Footer webProperty="story" />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const { links } = await requestCmsData();

  const [ognInfo, seoRes, walletBalances, stakingData] = await Promise.all([
    requestOgnData(),
    fetchAPI("/story/page/en/%2F"),
    requestGovernanceWalletBalances(),
    requestStakingData(),
  ]);

  return {
    props: {
      links,
      ognInfo,
      walletBalances,
      stakingData,
      seo: transformSeo(seoRes.data),
    },
    revalidate: 5 * 60, // revalidate every 5 minutes
  };
}

export default Dashboard;
