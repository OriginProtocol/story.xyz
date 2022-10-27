import type { NextApiRequest, NextApiResponse } from 'next'

const getOgn = async () => {
  const ognFetches = await Promise.all([
    fetch(`${process.env.NEXT_LEGACY_WEBSITE_HOST}/circulating-ogn`),
    fetch(`${process.env.NEXT_LEGACY_WEBSITE_HOST}/total-ogn`),
    fetch(`${process.env.NEXT_PUBLIC_COINGECKO}/price?ids=origin-protocol&vs_currencies=usd`),
  ])

  const response = await Promise.all(ognFetches.map(ognRes => ognRes.json()))
  return response
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const [ circulatingOgn, totalOgn, ognPrice] = await getOgn()

  res.status(200).json({ circulatingOgn, totalOgn, ognPrice: ognPrice['origin-protocol'].usd })
}