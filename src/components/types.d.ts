export type Article = {
  title: string,
  description: string,
  slug: string,
  cover?: {
    url: string
  },
  cardCover?: {
    url: string
  }
}

type MetaSocial = {
  title: string
  description: string
  image?: {
    url: string
  }
}

export type MetaSocialRaw = {
  socialNetwork: 'Facebook' | 'Twitter',
  title?: string,
  description?: string,
  image?: {
    url: string
  }
}

export type SeoFormatted = {
  canonicalUrl?: string
  metaDescription?: string
  metaTitle: string,
  metaRobots?: string
  metaViewport?: string
  structuredData?: string
  article?: {}
  metaSocial: {
    facebook?: MetaSocialRaw,
    twitter?: MetaSocialRaw
  }
  shareImage?: {
    url: string
  },
}