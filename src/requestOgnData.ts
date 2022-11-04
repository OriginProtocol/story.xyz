import { getOgn } from "../pages/api/ogn"

const requestOgnData = async () => {
  const [ circulatingOgn, totalOgn, ognPrice ] = await getOgn()
  return { circulatingOgn, totalOgn, ognPrice }
}

export default requestOgnData