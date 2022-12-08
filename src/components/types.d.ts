export type Article = {
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
    alternativeText: string;
  };
  cardCover?: {
    url: string;
    alternativeText: string;
  };
  category: {
    name: string;
    slug: string;
  };
};

type MetaSocial = {
  title: string;
  description: string;
  image?: {
    url: string;
  };
};

export type MetaSocialRaw = {
  socialNetwork: "Facebook" | "Twitter";
  title?: string;
  description?: string;
  image?: {
    url: string;
  };
};

export type SeoFormatted = {
  canonicalUrl?: string;
  metaDescription?: string;
  metaTitle: string;
  metaRobots?: string;
  metaViewport?: string;
  structuredData?: string;
  article?: object;
  metaSocial: {
    facebook?: MetaSocialRaw;
    twitter?: MetaSocialRaw;
  };
  shareImage?: {
    url: string;
  };
};

export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
