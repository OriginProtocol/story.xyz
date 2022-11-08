import { getOgn } from "../pages/api/ogn"

const requestOgnData = async () => {
  const [ circulatingOgn, totalOgn, ognPrice ] = await getOgn()
  return { circulatingOgn, totalOgn, ognPrice: (ognPrice['origin-protocol'] || {}).usd }
}

export default requestOgnData