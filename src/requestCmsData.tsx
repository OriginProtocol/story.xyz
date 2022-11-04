import { getCollections, getDrops, getNavLinks } from "../pages/api/cms"
import transformCollections from "./helpers/transformCollections"
import transformLinks from "./helpers/transformLinks"

const requestCms = async () => {
  const [ links, collections, drops ] = await Promise.all([getNavLinks(), getCollections(), getDrops()])
  return {
    links: transformLinks(links),
    collections: transformCollections(collections),
    drops: transformCollections(drops),
  }
}

export default requestCms