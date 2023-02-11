// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import qs from "qs";
import { Article, Meta } from "../components/types";

const apiUrl = process.env.STRAPI_API_URL || "http://localhost:1337/api";

export const getNavLinks = async () => {
  const query = qs.stringify(
    {
      populate: {
        details: {
          populate: "*",
        },
        links: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const data = await fetch(`${apiUrl}/story-nav-links?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  });

  const dataParsed = await data.json();
  const links = dataParsed.data;

  const h4x = links.find((link) => link.attributes?.label === "Dashboard") || {
    attributes: {},
  };

  h4x.attributes.href = "/dashboard";
  h4x.attributes.target = "_self";

  return links;
};

export const getCollections = async () => {
  const query = qs.stringify(
    {
      populate: {
        details: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const data = await fetch(`${apiUrl}/story-collections?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  });

  const dataParsed = await data.json();
  const collections = dataParsed.data;

  return collections;
};

export const getDrops = async () => {
  const query = qs.stringify(
    {
      populate: {
        details: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  const data = await fetch(`${apiUrl}/story-drops?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  });

  const dataParsed = await data.json();
  const drops = dataParsed.data;

  return drops;
};

export const getArticles: () => Promise<[Article[], Meta]> = async () => {
  const params = qs.stringify({
    pagination: {
      pageSize: 1000,
    },
  });

  const data = await fetch(`${apiUrl}/story/blog/en?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  });

  const articlesParsed = await data.json();
  const articles = articlesParsed.data;
  const meta: Meta = articlesParsed.meta;

  return [articles, meta];
};
