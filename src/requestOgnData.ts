import { getOgn } from "../pages/api/ogn";

const requestOgnData = async () => {
  const [circulatingOgn, totalOgn, ognData] = await getOgn();
  const {
    usd: ognPrice,
    usd_market_cap: marketCap,
    usd_24h_change: ogn24hChange,
  } = ognData["origin-protocol"] || {};

  return {
    circulatingOgn,
    totalOgn,
    ognPrice: ognPrice ?? null,
    marketCap: marketCap ?? null,
    ogn24hChange: ogn24hChange ?? null,
  };
};

export default requestOgnData;
