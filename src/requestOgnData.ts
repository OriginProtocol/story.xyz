import transformLinks from "./helpers/transformLinks"
import transformCollections from "./helpers/transformCollections"

const requestOgnData = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ogn`)
  const { circulatingOgn, totalOgn, ognPrice } = await data.json()
  return { circulatingOgn, totalOgn, ognPrice }
}

export default requestOgnData