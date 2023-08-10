import {
  getCollections,
  getDrops,
  getNavLinks,
  getArticles,
} from "./services/getCms";
import transformCollections from "./helpers/transformCollections";
import transformLinks from "./helpers/transformLinks";

const requestCms = async (locale?: string) => {
  const [links, collections, drops, [articles, meta]] = await Promise.all([
    getNavLinks(),
    getCollections(),
    getDrops(),
    getArticles(locale),
  ]);
  return {
    links: transformLinks(links),
    collections: transformCollections(collections),
    drops: transformCollections(drops),
    articles,
    meta,
  };
};

export default requestCms;
