import transformLinks from "./helpers/transformLinks"
import transformCollections from "./helpers/transformCollections"

const requestCms = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cms`)
  const { links, collections, drops } = await data.json()
  return {
    links: transformLinks(links),
     collections: transformCollections(collections),
     drops: transformCollections(drops),
  }
}

export default requestCms