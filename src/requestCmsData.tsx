import { getCollections, getDrops, getNavLinks, getArticles } from "./services/getCms"
import transformCollections from "./helpers/transformCollections"
import transformLinks from "./helpers/transformLinks"

const requestCms = async () => {
  const [ links, collections, drops, [articles, meta] ] = await Promise.all([getNavLinks(), getCollections(), getDrops(), getArticles()])
  return {
    links: transformLinks(links),
    collections: transformCollections(collections),
    drops: transformCollections(drops),
    articles,
    meta
  }
}

export default requestCms