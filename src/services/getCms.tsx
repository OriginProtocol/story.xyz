// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import qs from 'qs'
import { Article } from '../components/types'

const apiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337/api'

export const getNavLinks = async () => {
  const query = qs.stringify({
    populate: {
      details: {
        populate: '*',
      },
      links: {
        populate: '*',
      }
    },
  }, {
    encodeValuesOnly: true,
  })

  const data = await fetch(
    `${apiUrl}/story-nav-links?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const dataParsed = await data.json()
  const links = dataParsed.data

  return links
}

export const getCollections = async () => {
  const query = qs.stringify({
    populate: {
      details: {
        populate: '*'
      }
    }
  }, {
    encodeValuesOnly: true,
  })

  const data = await fetch(
    `${apiUrl}/story-collections?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const dataParsed = await data.json()
  const collections = dataParsed.data

  return collections
}

export const getDrops = async () => {
  const query = qs.stringify({
    populate: {
      details: {
        populate: '*'
      }
    }
  }, {
    encodeValuesOnly: true,
  })

  const data = await fetch(
    `${apiUrl}/story-drops?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const dataParsed = await data.json()
  const drops = dataParsed.data

  return drops
}

export const getArticles: () => Promise<Article[]> = async () => {
  const data = await fetch(
    `${apiUrl}/story/blog/en`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`
      }
    }
  )

  const articlesParsed = await data.json()
  const articles = articlesParsed.data

  return articles
}
