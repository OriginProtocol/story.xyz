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

const Dashboard = ({
  links,
  ognInfo,
  seo,
  walletBalances,
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
  seo: SeoFormatted;
}) => {
  const rewardsInfo = {
    ognDeposited: 94345435,
    ethInRewardsPool: 53.6554,
    ognInRewardsPool: 215343,
  };

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
        <TokenStats {...ognInfo} {...rewardsInfo} />
        <div className="max-w-screen-xl mx-auto sm:px-9 px-0">
          <section className="sm:mb-24 relative">
            <WhereToBuy />
          </section>
        </div>
        <StakeCTA {...rewardsInfo} />
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
  const ognInfo = await requestOgnData();
  const seoRes = await fetchAPI("/story/page/en/%2F");
  const walletBalances = await requestGovernanceWalletBalances();

  return {
    props: {
      links,
      ognInfo,
      walletBalances,
      seo: transformSeo(seoRes.data),
    },
    revalidate: 5 * 60, // revalidate every 5 minutes
  };
}

export default Dashboard;
